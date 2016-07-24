var gridCanvas = (function ($) {

    var ctx;
    var onClickCallback;
    var $canvasElement;

    var width;
    var height;
    var cellSize;

    function init(settings) {
        width = settings.width;
        height = settings.height;
        cellSize = settings.cellSize;
        onClickCallback = settings.onClick;
        $canvasElement = settings.$canvasElement;
        $canvasElement.on('click', onClick);
        ctx = $canvasElement[0].getContext("2d");
        drawGrid()
    }

    function onClick(event) {
        var coordinate = {
            x: pixelAsCell(event.offsetX),
            y: pixelAsCell(event.offsetY)
        };
        onClickCallback(coordinate)
    }

    function pixelAsCell(pixel) {
        return pixel / cellSize
    }

    function cellAsPixel(cell) {
        return cell * cellSize
    }

    function setCellSize(size) {
        cellSize = size;
    }

    function drawGrid() {
        $canvasElement.attr("width", cellAsPixel(width));
        $canvasElement.attr("height", cellAsPixel(height));
        ctx.strokeStyle = "gray";
        var line;
        for (var x = 0; x < width; x++) {
            line = {from: {x: x, y: 0}, to: {x: x, y: height}};
            drawLine(line)
        }
        for (var y = 0; y < height; y++) {
            line = {from: {x: 0, y: y}, to: {x: width, y: y}};
            drawLine(line);
        }
    }

    function drawWall(line){
        ctx.strokeStyle = "red";
        ctx.lineWidth = 2;
        drawLine(line)
    }

    function drawLine(line) {
        ctx.beginPath();
        ctx.moveTo(cellAsPixel(line.from.x), cellAsPixel(line.from.y));
        ctx.lineTo(cellAsPixel(line.to.x), cellAsPixel(line.to.y));
        ctx.stroke();
    }

    return {
        init: init,
        drawWall: drawWall,
        drawGrid: drawGrid,
        setCellSize: setCellSize
    }
})($);