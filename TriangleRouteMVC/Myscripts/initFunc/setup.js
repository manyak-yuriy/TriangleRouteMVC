
var
    rowCnt = 25;
    colCnt = 30;
    boxH = 135;
    boxW = 135;

    cellH = 70;
    cellW = 70;

function setup() {
    //ghosts = g.frames("../sprites/ghosts/ghost.png", [[0, 0],[32, 0]], 32, 48);

    terrain = initTerrain();
    
    //g.state = play;
}

function initTerrain() {
    var terrain = g.group();
    g.stage.addChild(terrain);
    terrain.x = 20;
    terrain.y = 20;


    for (var i = 0; i < rowCnt; i++)
        for (var j = 0; j <= i; j++) {

            var allDust = g.filmstrip("../sprites/bubble-death.png", 192, 192);
            
            var bubble = g.sprite(allDust);

            
            bubble.show(g.randomInt(0, 3));
            g.pulse(bubble, g.randomInt(10, 13), g.randomInt(80, 90) / 100);
            //bubble.anchor.set(0.5, 0.5)
            //g.breathe(bubble, 0.1, 0.1, 20, true, 100);
            bubble.loop = true;
            bubble.interact = true;
            bubble.fps = g.randomInt(8, 15);

            bubble.playAnimation([3, 29]);

            setTimeout(function () {
                    
                }
                , 2000);
            //bubble.on("click", function() { alert(3); this.playAnimation([3, 29])}, false);
            
            var value = g.randomInt(1, 120);
            var message = g.text(value, "15px puzzler", "white");

            bubble.width = boxW * value / 200 + 30;
            bubble.height = boxH * value / 200 + 30;

            message.x = cellW * j + cellW / 2 - message.width / 2;
            message.y = cellH * i + cellH / 2 - message.height / 2;

            bubble.x = cellW * j + cellW / 2 - bubble.width / 2;
            bubble.y = cellH * i + cellH / 2 - bubble.height / 2;

            terrain.addChild(bubble);
            terrain.addChild(message);
        }

    return terrain;
}