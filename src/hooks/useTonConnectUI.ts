import { inject} from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';
import { tonConnectUIKey } from '../utils/keys';

export function useTonConnectUI() {
    const tonConnectUI = inject<TonConnectUI | null>(tonConnectUIKey, null);

    const setOptions = (options: TonConnectUiOptions) => {
        if (tonConnectUI) {
            tonConnectUI.uiOptions = options;
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
        tonConnectUI,
        setOptions,
    };
}
