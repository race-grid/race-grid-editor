var racegrid = (function ($) {

    var $canvas;
    var $slider;

    var squareSize = 10;
    var GRID_WIDTH = 10;
    var GRID_HEIGHT = 10;

    var walls = [
        {from: {x: 2, y: 2}, to: {x: 1, y: 4}},
        {from: {x: 1, y: 4}, to: {x: 2, y: 6}}
    ];

    var DEFAULT = 0;
    var STARTING_WALL = 1;
    var ENDING_WALL = 2;
    var SETTING_GOAL = 3;
    var SETTING_START = 4;
    var state = DEFAULT;

    var wallStart;
    var polygonStart;

    function connectWall() {
        var wall = {from: wallStart, to: polygonStart};
        walls.push(wall);
        drawCanvas();
        state = DEFAULT;
    }

    function initEventListeners() {
        $slider = $("#grid-size-slider");
        $slider.on("input change", drawCanvas);
        $("#make-wall-button").on("click", function () {
            state = STARTING_WALL;
        });
        $("#end-wall-button").on("click", function () {
            state = DEFAULT;
        });
        $("#connect-wall-button").on("click", connectWall)
        $("#clear-walls-button").on("click", function () {
            walls = [];
            drawCanvas();
        })
    }

    function initCanvas() {
        $canvas = $("#map-canvas");
        $canvas.on('click', onClickCanvas);
        drawCanvas();
    }

    function drawCanvas() {
        squareSize = $slider.val();
        $canvas.attr("width", gridAsPixel(GRID_WIDTH));
        $canvas.attr("height", gridAsPixel(GRID_HEIGHT));
        drawGrid();
        drawWalls();
    }

    function drawGrid() {
        var ctx = $canvas[0].getContext("2d");
        ctx.strokeStyle = "gray";
        var line;
        for (var x = 0; x < GRID_WIDTH; x++) {
            line = {from: {x: x, y: 0}, to: {x: x, y: GRID_HEIGHT}};
            drawLine(ctx, line)
        }

        for (var y = 0; y < GRID_HEIGHT; y++) {
            line = {from: {x: 0, y: y}, to: {x: GRID_WIDTH, y: y}};
            drawLine(ctx, line);
        }
    }

    function drawWalls() {
        var ctx = $canvas[0].getContext("2d");
        ctx.strokeStyle = "red";
        ctx.lineWidth = 4;
        walls.forEach(function (wall) {
            drawLine(ctx, wall)
        })
    }

    function drawLine(ctx, line) {
        ctx.beginPath();
        ctx.moveTo(gridAsPixel(line.from.x), gridAsPixel(line.from.y));
        ctx.lineTo(gridAsPixel(line.to.x), gridAsPixel(line.to.y));
        ctx.stroke();
    }

    function onClickCanvas(event) {
        var coordinate = {
            x: pixelAsGrid(event.offsetX),
            y: pixelAsGrid(event.offsetY)
        };
        switch (state) {
            case DEFAULT:
                console.log(coordinate);
                break;
            case STARTING_WALL:
                wallStart = coordinate;
                polygonStart = coordinate;
                state = ENDING_WALL;
                break;
            case ENDING_WALL:
                var wall = {from: wallStart, to: coordinate};
                walls.push(wall);
                drawCanvas();
                wallStart = coordinate;
                break;
        }
    }

    function pixelAsGrid(pixel) {
        return pixel / squareSize
    }

    function gridAsPixel(grid) {
        return grid * squareSize
    }

    return {
        init: function () {
            initEventListeners();
            initCanvas();
        }
    }
})($);