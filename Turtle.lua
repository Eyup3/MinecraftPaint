local ws,err = http.websocket(args[1])

if ws then
    while true do
        local msg = ws.receive()
        print(msg)

        if string.len(msg) > 0 then



            local code = msg
            local size = math.sqrt(string.len(code))
            print(size)
            
            
            local isNativeDirection = true
            local n = 1
            
            for i = 1,size do
                for j = 1,size do
                    local subs = string.sub(code, n, n)
                    print(subs)
                
                    turtle.select(tonumber(subs))
                    n = n + 1
                    
                    turtle.placeDown()
                    
                    if j ~= size then
                        turtle.forward()
                    end 
                end 
                
                if isForward then
                    turtle.turnRight()
                    turtle.forward()
                    turtle.turnRight()
                else 
                    turtle.turnLeft()
                    turtle.forward()
                    turtle.turnLeft()
                end
            
            
                isForward = not isForward
            
            
            end



            
        end
    end
end