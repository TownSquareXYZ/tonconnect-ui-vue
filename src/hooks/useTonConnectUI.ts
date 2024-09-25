import { inject} from 'vue-demi';
import { TonConnectUI, TonConnectUiOptions } from '@tonconnect/ui';
import { checkProvider } from '../utils/errors';
import { isServerSide } from '../utils/web';
import { tonConnectUIKey } from '../injection-keys';

export function useTonConnectUI() {
    const tonConnectUI = inject(tonConnectUIKey, null);

    if (isServerSide()) {
        return {
            tonConnectUI: null as unknown as TonConnectUI,
            setOptions: () => {},
        };
    }

    const setOptions = (options: TonConnectUiOptions) => {
        if (tonConnectUI && tonConnectUI) {
            tonConnectUI.uiOptions = options;
        }
    };

    checkProvider(tonConnectUI);

    return {
        tonConnectUI,
        setOptions,
    };
}
