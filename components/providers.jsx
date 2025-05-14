"use client"

import { WalletProvider } from "@/contexts/wallet-context"

export function Providers({ children }) {
  return <WalletProvider>{children}</WalletProvider>
}
