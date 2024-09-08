import { inject } from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';
import { tonConnectUIKey } from '../utils/keys';

export function useTonConnectUI(): [TonConnectUI, (options: TonConnectUiOptions) => void] {
    const tonConnectUI = inject(tonConnectUIKey) as TonConnectUI | null;

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
