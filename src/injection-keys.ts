import type { InjectionKey } from 'vue'
import { TonConnectUI } from '@tonconnect/ui'

export const tonConnectUIKey: InjectionKey<TonConnectUI | null> = Symbol('tonConnectUI') 
