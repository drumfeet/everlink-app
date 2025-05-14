"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function Home() {
  const [subdomain, setSubdomain] = useState("")

  const handleClaim = () => {
    if (!subdomain.trim()) {
      toast.error("Please enter a subdomain")
      return
    }
    toast.success(`Claiming https://everlink.fun/${subdomain} coming soon!`)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-md mx-auto text-center">
      <p className="text-gray-500 mb-8">
        This will be your unique identifier on Everlink.
      </p>
      <div className="w-full max-w-sm">
        <div className="flex w-full items-center rounded-md border bg-background ring-offset-background">
          <span className="pl-3 text-sm text-muted-foreground select-none">https://everlink.fun/</span>
          <Input
            type="text"
            placeholder="username"
            value={subdomain}
            onChange={(e) => setSubdomain(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>
      <Button
        className="mt-4 w-full max-w-sm"
        onClick={handleClaim}
      >
        Claim
      </Button>
    </div>
  )
}
