"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

export function Header() {
  const handleWanderWallet = async () => {
    await globalThis.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "SIGN_TRANSACTION",
      "ACCESS_PUBLIC_KEY",
      "SIGNATURE",
    ])
    const _userAddress = await globalThis.arweaveWallet.getActiveAddress()
    console.log("_userAddress", _userAddress)
    toast("Wander Wallet connected")
  }

  const handleOtherWallet = async () => {
    toast("Other Wallet coming soon")
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold hover:text-gray-700 transition-colors">everlink.fun</Link>
        <div className="flex items-center gap-2">
          <Link href="/explore">
            <Button variant="ghost" size="icon" className="w-9 h-9">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
                <path d="M5 3v4" />
                <path d="M19 17v4" />
                <path d="M3 5h4" />
                <path d="M17 19h4" />
              </svg>
            </Button>
          </Link>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Login</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Connect</DialogTitle>
              </DialogHeader>
              <div className="flex flex-col gap-3 mt-4">
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={handleWanderWallet}
                >
                  Wander Wallet
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start text-left font-normal"
                  onClick={handleOtherWallet}
                >
                  Other Wallet
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </header>
  )
}
