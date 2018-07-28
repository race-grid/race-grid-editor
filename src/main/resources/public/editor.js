var editor = (function ($) {

    var $slider;

    var GRID_WIDTH = 50;
    var GRID_HEIGHT = 50;

    var walls = [];

    // States
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
        redraw();
        state = DEFAULT;
    }

    function initEventListeners() {
        $slider = $("#grid-size-slider");
        $slider.on("input change", redraw);
        $("#make-wall-button").on("click", function () {
            state = STARTING_WALL;
        });
        $("#end-wall-button").on("click", function () {
            state = DEFAULT;
        });
        $("#connect-wall-button").on("click", connectWall);
        $("#clear-walls-button").on("click", function () {
            walls = [];
            redraw();
        })
    }

    function redraw() {
        gridCanvas.setCellSize($slider.val());
        gridCanvas.drawGrid();
        walls.forEach(function (wall) {
            gridCanvas.drawWall(wall)
        })
    }

    function onClickCanvas(coordinate) {
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
                redraw();
                wallStart = coordinate;
                break;
        }
    }

    return {
        init: function () {
            initEventListeners();
            var settings = {
                width: GRID_WIDTH,
                height: GRID_HEIGHT,
                cellSize: $slider.val(),
                $canvasElement: $("canvas"),
                onClick: onClickCanvas
            };
            gridCanvas.init(settings);
        }
    }
})($);