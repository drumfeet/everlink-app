"use client"

import { Button } from "./ui/button"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { useState } from "react"
import { useWallet } from "@/contexts/wallet-context"
import { toast } from "sonner"

export function Header() {
  const [open, setOpen] = useState(false)
  const { address, connecting, connectWanderWallet, connectOtherWallet, disconnect } = useWallet()

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address)
      toast("Address copied to clipboard")
    }
  }

  const handleWanderWallet = async () => {
    setOpen(false)
    await connectWanderWallet()
  }

  const handleOtherWallet = async () => {
    setOpen(false)
    await connectOtherWallet()
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              {address ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {address.slice(0, 4)}...{address.slice(-4)}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <Link href={`/user/${address}`}>
                      <DropdownMenuItem className="cursor-pointer">
                        Dashboard
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem onClick={copyAddress} className="cursor-pointer">
                      Copy Address
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={disconnect} className="cursor-pointer text-red-600 focus:text-red-600">
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button disabled={connecting}>
                  {connecting ? "Connecting..." : "Login"}
                </Button>
              )}
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
