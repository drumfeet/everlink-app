"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { useWallet } from "@/contexts/wallet-context"
import { CheckIcon } from "lucide-react"

const MAIN_PROCESS_ID = "wrxPk1k6Xo2O3k7LYl6hCw5D_-ORwKesImYNlbo5bAY"
const TRANSACTION_ID_PLACEHOLDER = "oork_YifB3-JQQZg8EgMPQJytua_QCHKNmMqt5kmnCo"

export default function Home() {
  const [undername, setUndername] = useState("")
  const [isValid, setIsValid] = useState(true)
  const [recordStatus, setRecordStatus] = useState(null) // null: not checked, true: exists, false: available
  const { address } = useWallet()

  const getUndernameRecord = async () => {
    const validation = validateUsernameInput(undername)
    if (!validation.valid) {
      toast.error(validation.message)
      return
    }

    try {
      const { dryrun } = await import('@permaweb/aoconnect');
      const undernameRecord = await dryrun({
        process: MAIN_PROCESS_ID,
        tags: [{ name: "Action", value: "GetUndernameRecord" }, { name: "Undername", value: undername }],
      })
      console.log("undernameRecord", undernameRecord)
      const record = JSON.parse(undernameRecord.Messages[0].Data)
      console.log("record", record)
      setRecordStatus(record !== null && Object.keys(record).length > 0)

      if (record && Object.keys(record).length > 0) {
        toast.error('This username is already taken')
      } else {
        toast.success('This username is available')
      }
    } catch (error) {
      console.error('Error getting undername record', error);
      toast.error('Failed to get undername record');
    }
  }

  const validateUndername = (value) => {
    // Allow letters, numbers, and hyphens, but not at start/end
    const pattern = /^[a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]$/
    return value.length >= 3 && pattern.test(value)
  }

  const validateUsernameInput = (username) => {
    if (!username.trim()) {
      return { valid: false, message: "Please enter a username" }
    }

    if (!validateUndername(username)) {
      return { valid: false, message: "Username must be at least 3 characters and can only contain letters, numbers, and hyphens (not at start/end)" }
    }

    return { valid: true }
  }

  const handleInputChange = (e) => {
    const value = e.target.value
    // Reset record status when input changes
    if (recordStatus !== null) {
      setRecordStatus(null)
    }
    // Allow typing any character but validate for feedback
    setUndername(value)
    setIsValid(value === "" || validateUndername(value))
  }

  const handleClaim = async () => {
    const validation = validateUsernameInput(undername)
    if (!validation.valid) {
      toast.error(validation.message)
      return
    }

    if (!address) {
      toast.error("Login to claim your username")
      return
    }

    try {
      const { message, createDataItemSigner, result } = await import('@permaweb/aoconnect')

      const messageId = await message({
        process: MAIN_PROCESS_ID,
        tags: [
          {
            name: "Action",
            value: "Set-Record",
          }
        ],
        signer: createDataItemSigner(globalThis.arweaveWallet),
      })
      console.log("messageId", messageId)

      const _result = await result({
        message: messageId,
        process: MAIN_PROCESS_ID,
      })
      console.log("_result", _result)
    } catch (error) {
      console.error('Error setting undername record', error);
      toast.error('Failed to set undername record');
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] max-w-md mx-auto text-center">
      <h1 className="text-3xl font-bold mb-4">
        Create your Everlink
      </h1>
      <div className="w-full max-w-sm">
        <div className="flex w-full items-center rounded-md border bg-background ring-offset-background">
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
          <Button
            variant="outline"
            size="icon"
            onClick={getUndernameRecord}
            className="ml-2"
          >
            <CheckIcon className="h-4 w-4" />
          </Button>
        </div>
        {recordStatus !== null && (
          <p className={`mt-2 text-sm ${recordStatus ? 'text-destructive' : 'text-green-600'}`}>
            {recordStatus ? (
              'This username is already taken'
            ) : (
              <>
                This username is available <br />
                <a
                  href={`https://everlink.fun/${undername}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline"
                >
                  everlink.fun/{undername}
                </a>
              </>
            )}
          </p>
        )}
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
