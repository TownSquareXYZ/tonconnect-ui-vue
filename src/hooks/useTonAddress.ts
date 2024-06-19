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

    // 监听钱包的变化，更新 TON 地址
    watchEffect(() => {
        updateTonAddress();
    });

    return tonAddress;
}
