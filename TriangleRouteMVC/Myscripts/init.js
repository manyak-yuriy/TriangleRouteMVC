
thingsToLoad = ["../sprites/bubble-death.png"]

// Create a new Hexi instance, and start it
var
    wid = $('#render-container').width() + 100;
var 
    g = hexi(wid, wid, setup, thingsToLoad);

    $('#render-container').append($('canvas'))


   /* $(window).resize(() => {
        var wid = $('#render-container').width();
        var widCan = 3000;
        $('canvas').attr("width", Math.max(wid, widCan))
    }) */
    
//Set the background color and scale the canvas
    //g.backgroundColor = "black";
    //g.scaleToWindow();
    g.fps = 25;

//Start Hexi
    g.start();