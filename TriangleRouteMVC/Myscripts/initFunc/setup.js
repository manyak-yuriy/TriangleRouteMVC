


function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    //terrain = initTerrain();
    
    //g.state = play;
}

var
       bubbles = []

var
    dir = ""

var

    boxH = 135;
boxW = 135;

cellH = 70;
cellW = 70;

var
    terrain;

//data: {<Number>sum: ..., <String>dir: ..., <Array<String>>inpLines: ...}

// build bubble field based on server output data
function buildResult(data) {
    // sum output
    $('#res div.panel-body div#sum-res').remove();
    $('#res div.panel-body').prepend("<div id='sum-res'> &sum;" + " = " + data.sum + "</div>");
    // --

    // assign to global
    dir = data.dir;

    terrain = g.group()
    gu = new GameUtilities();
    camera = gu.worldCamera(terrain, terrain.width, terrain.height, g.renderer.view);

    for (ii = 0; ii < bubbles.length; ii++)
        for (jj = 0; jj <= ii; jj++) {
            bubbles[ii][jj].visible = false
            terrain.removeChild(bubbles[ii][jj])
        }
    bubbles = []

    g.stage.addChild(terrain);
    terrain.x = 20;
    terrain.y = 20;

    var rowCnt = data.inpLines.length;

    // fit canvas to contents
    /*
    $('canvas').attr("width", 100 + boxW * rowCnt);
    $('canvas').attr("height", 100 + boxH * rowCnt);
    */
    if (rowCnt > 20) {
        $elem = $("<div class='alert alert-warning fade in'> <a href='#' class='close' data-dismiss='alert' aria-label='close'>&times;</a> <strong>Warning!</strong> Too many rows to visualize </div>")
        $('#panel').append($elem);
    }
    else
        for (var i = 0; i < rowCnt; i++) {
            var lineElem = data.inpLines[i].split(" ");
            for (var k = 0; k < lineElem.length; k++)
                lineElem[k] = +lineElem[k];
            var
                max = data.max;

            bubbles[i] = []

            for (var j = 0; j <= i; j++) {

                var allDust = g.filmstrip("../sprites/bubble-death.png", 192, 192);

                var bubble = g.sprite(allDust);

                bubble.show(g.randomInt(0, 3));
                g.pulse(bubble, g.randomInt(10, 13), g.randomInt(75, 90) / 100);
                //bubble.anchor.set(0.5, 0.5)
                //g.breathe(bubble, 0.1, 0.1, 20, true, 100);
                bubble.loop = false;
                bubble.interact = true;
                bubble.fps = 40;

                //bubble.playAnimation([3, 29]);

                //bubble.on("click", function() { alert(3); this.playAnimation([3, 29])}, false);

                var value = +lineElem[j];
                var message = g.text(value, "15px puzzler", "white");

                bubble.width = boxW * value / (1.5 * max) + 30;
                bubble.height = boxH * value / (1.5 * max) + 30;

                message.x = cellW * j + cellW / 2 - message.width / 2;
                message.y = cellH * i + cellH / 2 - message.height / 2;

                bubble.x = cellW * j + cellW / 2 - bubble.width / 2;
                bubble.y = cellH * i + cellH / 2 - bubble.height / 2;

                terrain.addChild(bubble);
                terrain.addChild(message);

                bubbles[i].push(bubble)
            }
        }



}


