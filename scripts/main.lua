local json = require('json')

ANT_PROCESS_ID = ""
KEY_SUB_DOMAIN = "Sub-Domain" -- similar to undername or username
KEY_TRANSACTION_ID = "Transaction-Id"
KEY_TTL = "TTL-Seconds"
TRANSACTION_ID_PLACEHOLDER = "oork_YifB3-JQQZg8EgMPQJytua_QCHKNmMqt5kmnCo"

Records = Records or {
    demo = {
        Owner = "8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw",
        [KEY_TRANSACTION_ID] = TRANSACTION_ID_PLACEHOLDER,
    }
}

local sendErrorMessage = function(msg, err, target)
    if not target then
        Send({ Target = msg.From, Error = "true", Data = err })
        print("Error", "From" .. " " .. msg.From .. " " .. err)
    else
        Send({ Target = target, Error = "true", Data = err })
        print("Error", "Target" .. " " .. target .. " " .. err)
    end
end

Handlers.add("GetUndernameRecord", function(msg)
    local _record = Records[msg.Tags.Undername] or nil

    Send({
        Target = msg.From,
        Undername = msg.Tags.Undername,
        Record = _record,
        Data = json.encode(_record)
    })
end)

Handlers.add('Set-Record', Handlers.utils.hasMatchingTag('Action', 'Set-Record'), function(msg)
    local msgFrom = msg.From
    local undernameRecord = msg[KEY_SUB_DOMAIN]
    local transactionId = msg[KEY_TRANSACTION_ID]
    local ttl = msg[KEY_TTL] or "900" -- Default to 900 if not provided

    if type(undernameRecord) ~= 'string' or undernameRecord == "" then
        sendErrorMessage(msg, 'Key Sub-Domain is required and must be a string')
        return
    end

    if type(transactionId) ~= 'string' or transactionId == "" then
        sendErrorMessage(msg, 'Key Transaction-Id is required and must be a string')
        return
    end

    -- Check if subdomain already exists
    if Records[undernameRecord] then
        -- verify ownership
        if Records[undernameRecord]["Owner"] ~= msgFrom then
            sendErrorMessage(msg, 'Undername record already exists and belongs to another owner')
            return
        end

        -- verify Key Transaction-Id is equivalent to TRANSACTION_ID_PLACEHOLDER
        if Records[undernameRecord][KEY_TRANSACTION_ID] == TRANSACTION_ID_PLACEHOLDER then
            sendErrorMessage(msg, 'Undername record is already set to default')
            return
        end
    end

    Send({
        Target = ANT_PROCESS_ID,
        Action = "Set-Record",
        [KEY_SUB_DOMAIN] = undernameRecord,
        [KEY_TRANSACTION_ID] = transactionId,
        [KEY_TTL] = ttl
    })
end)

Handlers.add('Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Set-Record-Notice'), function(msg)
    print("Set-Record-Notice", msg)
end)

Handlers.add('Invalid-Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Set-Record-Notice'),
    function(msg)
        print("Invalid-Set-Record-Notice", msg)
    end)

Handlers.add('Invalid-Remove-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Remove-Record-Notice'),
    function(msg)
        print("Invalid-Remove-Record-Notice", msg)
    end)
