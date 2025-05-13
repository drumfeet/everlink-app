"use client"

import { Button } from "./ui/button"
import { toast } from "sonner"

export function Header() {
  const handleConnect = () => {
    toast("Connect button clicked", {
      description: "Connection feature coming soon!",
    })
  }

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="text-xl font-semibold">everlink.fun</div>
        <Button onClick={handleConnect}>Connect</Button>
      </div>
    </header>
  )
}
