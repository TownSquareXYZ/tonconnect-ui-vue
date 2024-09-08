import { inject, reactive, ref } from 'vue-demi'; // 使用 vue-demi 支持 Vue 2 和 Vue 3
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';
import { tonConnectUIKey } from '../utils/keys';

export function useTonConnectUI() {
    const tonConnectUI = inject(tonConnectUIKey) as TonConnectUI | null;
    const reactiveTonConnectUI = reactive(tonConnectUI || {} as TonConnectUI);

    const setOptions = (options: TonConnectUiOptions) => {
        if (reactiveTonConnectUI) {
            reactiveTonConnectUI.uiOptions = options;
        }
    };

    if (isServerSide()) {
        return {
            tonConnectUI: null as unknown as TonConnectUI,
            setOptions: () => {},
        };
    }

    checkProvider(tonConnectUI);

    return {
        tonConnectUI: reactiveTonConnectUI,
        setOptions,
    };
}
