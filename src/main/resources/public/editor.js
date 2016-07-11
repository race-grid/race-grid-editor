function initializeCanvas(width, height) {
    var canvas = document.getElementById("mapCanvas");
    canvas.setAttribute("width", width);
    canvas.setAttribute("height", height);
    var ctx = canvas.getContext("2d");
    drawGrid(ctx, width, height);
}

function drawGrid(ctx, width, height) {
    for(var i = 0; i < width; i++){
        ctx.moveTo(i * 10, 0);
        ctx.lineTo(i * 10, height);
        ctx.stroke();
    }
    for(var j = 0; j < height; j ++){
        ctx.moveTo(0, j * 10);
        ctx.lineTo(width, j * 10);
        ctx.strokeStyle="gray";
        ctx.stroke()
    }
}

function printMousePos(event) { // TODO: Get coordinates within canvas
    alert("clientX: " + event.clientX +
        " - clientY: " + event.clientY);
}
