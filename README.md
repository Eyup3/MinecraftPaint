# MinecraftPaint

A Node Project that allows you to paint in your Browser and let a Mining Turtle draw your canvas in Minecraft

## Installation

First of all you need to install NodeJS to run the code. I used v14.16.0. Everything later should work.

After that you need Ngrok. Install and unzip the package to get the Ngrok.exe

Download this project and run

```
npm i
npm run-script dev
```

Now copy the Path to your Ngrok.exe
and start another terminal session and type

```
<Your Ngrok Path here>.exe http 8080
```

Now youll get a link under Forwarding

Start Minecraft with the CC Tweaked Mod and place a mining turtle.
Fuel it and type

```
pastebin get nQJe3WQP controller
pastebin get Fk0CN0er json
controller <Your ngrok url with ws instead of http or https>
```

Now go to http://localhost:3000 and place concrete in the color order you see on the buttons white, orange, magenta...

You can use the text box to adjust your dimension

If your painting is ready click "export" and look at your turtle.
