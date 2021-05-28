os.loadAPI("json")
local direction = 0

local MyX = 0
local MyZ = 0

local function turnRight(dir)
    while (direction ~= dir) do
        turtle.turnRight()
        direction = direction + 1
        if (direction > 3) then
            direction = 0
        end
    end
end

-- MainFunction
local function MoveToThisPosition(x, y)
    -- Correct X-axis
    while (MyX < x) do
        turnRight(0)
        turtle.forward()
        MyX = MyX + 1
    end

    while (MyX > x) do
        turnRight(0)
        turtle.back()
        MyX = MyX - 1
    end

    -- Correct Z-axis
    while (MyZ > y) do
        turnRight(3)
        turtle.forward()
        MyZ = MyZ - 1
    end

    while (MyZ < y) do
        turnRight(1)
        turtle.forward()
        MyZ = MyZ + 1
    end
end

-- Start

-- IMPORTANT THE URL NEEDS A "ws://" instead a "http://" because that activates a weboscket
local ws, err = http.websocket(arg[1])
if err then
    print(err)
end
if ws then
    while true do
        local msg = ws.receive()
        local obj = json.decode(msg)

        -- If nothing in Buffer stop calculating the rest
        if obj == nil then
            return
        end

        -- The Websocket sends an array with points
        for i = 1, #obj do

            local x = obj[i]["x"]
            local y = obj[i]["y"]

            turtle.dig()

            -- Logs
            print("index: " .. i .. "\nx: " .. x .. "\ny: " .. y)

            MoveToThisPosition(x, y)

            turtle.digDown()
            turtle.select(tonumber(obj[i]["color"]))
            turtle.placeDown()

            print("Placed")

        end

        MoveToThisPosition(0, 0)
        turnRight(0)
        print("/////THE END/////")
    end
end
