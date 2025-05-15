local json = require('json')

Records = Records or {
    demo = {
        Owner = "8bIZKr6Wn15dYdkyXRfwaX7t_-MPzKB8w-WYxCyIXIw",
    }
}

Handlers.add("GetUndernameRecord", function(msg)
    local _record = Records[msg.Tags.Undername] or nil

    if msg.reply then
        msg.reply({
            Undername = msg.Tags.Undername,
            Record = _record,
            Data = json.encode(_record)
        })
    else
        Send({
            Target = msg.From,
            Undername = msg.Tags.Undername,
            Record = _record,
            Data = json.encode(_record)
        })
    end
end)

Handlers.add('Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Set-Record-Notice'), function(msg)

end)

Handlers.add('Invalid-Set-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Set-Record-Notice'),
    function(msg)

    end)

Handlers.add('Invalid-Remove-Record-Notice', Handlers.utils.hasMatchingTag('Action', 'Invalid-Remove-Record-Notice'),
    function(msg)

    end)
