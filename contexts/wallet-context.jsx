"use client"

import { createContext, useContext, useState } from "react"
import { toast } from "sonner"

const WalletContext = createContext({})

export function WalletProvider({ children }) {
  const [address, setAddress] = useState(null)
  const [connecting, setConnecting] = useState(false)

  const connectWanderWallet = async () => {
    try {
      setConnecting(true)
      await globalThis.arweaveWallet.connect([
        "ACCESS_ADDRESS",
        "SIGN_TRANSACTION",
        "ACCESS_PUBLIC_KEY",
        "SIGNATURE",
      ])
      const userAddress = await globalThis.arweaveWallet.getActiveAddress()
      setAddress(userAddress)
      toast("Wander Wallet connected")
    } catch (error) {
      console.error("Failed to connect Wander Wallet:", error)
      toast.error("Failed to connect Wander Wallet")
    } finally {
      setConnecting(false)
    }
  }

  const connectOtherWallet = async () => {
    toast("Other Wallet coming soon")
  }

  const disconnect = () => {
    setAddress(null)
    toast("Wallet disconnected")
  }

  return (
    <WalletContext.Provider
      value={{
        address,
        connecting,
        connectWanderWallet,
        connectOtherWallet,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider")
  }
  return context
}
