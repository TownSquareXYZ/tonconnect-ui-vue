import { ref, onMounted } from 'vue-demi';
import { useTonConnectUI } from './useTonConnectUI';

export function useIsConnectionRestored() {
    const restored = ref(false);
    const [tonConnectUI] = useTonConnectUI();

    onMounted(() => {
        if (tonConnectUI) {
            tonConnectUI.connectionRestored.then(() => {
                restored.value = true;
            });
        }
    });

    return restored;
}
