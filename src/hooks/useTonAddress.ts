import { computed } from 'vue-demi';
import { CHAIN, toUserFriendlyAddress } from '@tonconnect/ui';
import { useTonWallet } from './useTonWallet';

export function useTonAddress(userFriendly = true) {
    const wallet = useTonWallet();

    const tonAddress = computed(() => {
        if (wallet.value) {
            return userFriendly
                ? toUserFriendlyAddress(
                      wallet.value.account.address,
                      wallet.value.account.chain === CHAIN.TESTNET
                  )
                : wallet.value.account.address;
        } else {
            return '';
        }
    });

    return tonAddress;
}