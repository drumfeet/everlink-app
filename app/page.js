"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function Home() {
  const [undername, setUndername] = useState("")
  const [isValid, setIsValid] = useState(true)

  const validateUndername = (value) => {
    // Allow letters, numbers, and hyphens, but not at start/end
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/
    return value.length >= 3 && pattern.test(value)
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    // Allow typing any character but validate for feedback
    setUndername(value)
    setIsValid(value === "" || validateUndername(value))
  }

  const handleClaim = () => {
    if (!undername.trim()) {
      toast.error("Please enter a username")
      return
    }
    if (!validateUndername(undername)) {
      toast.error("Username must be at least 3 characters and can only contain letters, numbers, and hyphens (not at start/end)")
      return
    }
    toast.success(`Claiming https://everlink.fun/${undername} coming soon!`)
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
            value={undername}
            onChange={handleInputChange}
            className={`flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 ${!isValid ? 'text-destructive' : ''}`}
            pattern="[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]"
            minLength={3}
            aria-invalid={!isValid}
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
