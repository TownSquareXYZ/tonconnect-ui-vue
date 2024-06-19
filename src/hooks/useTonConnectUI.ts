import { inject, Ref } from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';

export function useTonConnectUI(): [TonConnectUI, (options: TonConnectUiOptions) => void] {
    // 在 inject 阶段
    const tonConnectUI = inject('tonConnectUI') as TonConnectUI | null;
    // 使用 .value 来获取 TonConnectUI | null 类型的值
    // const tonConnectUI = injectedTonConnectUIRef?.value as TonConnectUI | null;
    const setOptions = (options) => {
        if (tonConnectUI) {
            tonConnectUI.uiOptions = options;
        }
    };

    if (isServerSide()) {
        return [null as unknown as TonConnectUI, () => { }];
    }

    checkProvider(tonConnectUI);
    return [tonConnectUI!, setOptions];
}
