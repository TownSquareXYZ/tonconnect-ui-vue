import { ref , watchEffect } from 'vue-demi';
import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui';
import { useTonWallet } from './useTonWallet';

export function useTonAddress(userFriendly = true) {
    const wallet = useTonWallet();
    const tonAddress = ref('');

    const updateTonAddress = () => {
        if (wallet.value) {
            tonAddress.value = userFriendly
                ? toUserFriendlyAddress(
                      wallet.value.account.address,
                      wallet.value.account.chain === CHAIN.TESTNET
                  )
                : wallet.value.account.address;
        } else {
            tonAddress.value = '';
        }
    };

    watchEffect(() => {
        updateTonAddress();
    });

    return tonAddress;
}
