var pixelWidth = 256,
    pixelHeight = 256,
    cursorOffset = 20,
    cursorLineW = 2,
    pixelColor = 'blue',
    drawPos = [];
var mouse = {};
var oldTime, delta;
var canvas = document.getElementsByTagName('canvas')[0];
var exportBtn = document.getElementById('export');
var ctx = canvas.getContext('2d');

canvas.width = 512;
canvas.height = 512;

function drawGrid() {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(150, 150, 150, 0.75)';
    var x = 0, y = 0;
    while (x <= canvas.width) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        x += pixelWidth;
    }
    while (y <= canvas.height) {
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        y += pixelHeight;
    }
    ctx.stroke();
}

function getMousePos(event) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (Math.round((event.clientX - rect.left - (pixelWidth / 2)) / pixelWidth) * pixelWidth),
        y: (Math.round((event.clientY - rect.top - (pixelHeight / 2)) / pixelHeight) * pixelHeight)
    };
}

function clearCanvas() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawImage() {
    var p = 0;
    while (p < drawPos.length) {
        ctx.fillStyle = drawPos[p].color || pixelColor;
        ctx.fillRect(drawPos[p].x, drawPos[p].y, pixelWidth, pixelHeight);
        p++;
    }
}

function drawMouse() {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.fillRect(mouse.x, mouse.y, pixelWidth, cursorLineW);
    ctx.fillRect(mouse.x, mouse.y, cursorLineW, pixelHeight);

    ctx.fillStyle = pixelColor;
    ctx.fillRect(mouse.x + cursorLineW, mouse.y + cursorLineW, pixelWidth - cursorOffset, pixelHeight - cursorOffset);
}

function render() {
    clearCanvas();
    drawGrid();
    drawImage();
    drawMouse();
    window.requestAnimationFrame(render);
}
window.requestAnimationFrame(render);

canvas.addEventListener('mousemove', recordMouseMovement);
canvas.addEventListener('mousedown', startDrawing);
document.getElementById("te").addEventListener('mouseup', stopDrawing);
canvas.addEventListener('contextmenu', clearPixel);

exportBtn.addEventListener('mouseup', function (event) { exportImage(); });

function recordMouseMovement(event) {
    mouse = getMousePos(event);
}

function startDrawing(event) {
    if (event.button == 0) {
        mark = setInterval(function () {
            var pos = mouse;
            if (drawPos.length > 1 && drawPos.slice(-1)[0].x == pos.x && drawPos.slice(-1)[0].y == pos.y) { }
            else {
                pos['color'] = pixelColor;
                drawPos.push(pos);
            }
        }, 10);
    }
}

function stopDrawing(event) {
    clearInterval(mark);
}

function clearPixel(event) {
    event.preventDefault();
    var savedPos = drawPos.filter(function (savedPos) { return !(savedPos.x == mouse.x && savedPos.y == mouse.y); });
    drawPos = savedPos;
    return false;
}

const apply = () => {
    pixelWidth = canvas.width / document.getElementById("size").value
    pixelHeight = canvas.height / document.getElementById("size").value
    drawPos.length = 0
}



function exportImage() {
    var p = 0;
    while (p < drawPos.length) {
        drawPos[p].width = pixelWidth;
        drawPos[p].height = pixelHeight;
        p++;
    }

    // DrawPos Copys the first element thats why i put shift in here
    drawPos.shift()

    var resp = JSON.stringify(drawPos);
    sendData(resp)
    document.getElementById('data').innerHTML = resp;
}


const ws = new WebSocket("ws://192.168.2.169:8080")

ws.addEventListener("message", msg => {
    console.log(msg.data)
})

const sendData = data => ws.send(data)



