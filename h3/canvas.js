$(function() {

    //ctx1 tyre
    var a1 = document.getElementById('tyreCanvas');
    var ctx1 = a1.getContext('2d')
    var r1 = 40 / 2,
        r2 = 130 / 2,
        r3 = 160 / 2,
        r4 = 200 / 2;

    drawTyre(ctx1, r1, r2, r3, r4);

    function drawTyre(ctx, r1, r2, r3, r4) {
        // body...



        ctx.beginPath();
        ctx.moveTo(r4, r4 + r2);

        var angle = Math.PI / 3
        for (var i = 0; i < 6; i++) {
            ctx.arc(r4, r4, r2, Math.PI * 0.5 + angle * i, Math.PI * 0.5 + angle / 2 + angle * i, false);
            ctx.arc(r4, r4, r3, Math.PI * 0.5 + angle * i + angle * 0.5, Math.PI * 0.5 + angle * 0.5 * 2 + angle * i, false);

        }

        var w = ctx.canvas.width;
        var gri = ctx.createLinearGradient(40, 40, w - 40, w - 40);
        gri.addColorStop(0, "#333");
        gri.addColorStop(0.37, "#666");
        gri.addColorStop(0.4, "#fff");
        gri.addColorStop(0.43, "#fff");
        gri.addColorStop(0.47, "#666");
        gri.addColorStop(1, "#fff");

        ctx.fillStyle = gri;
        ctx.fill();
        ctx.stroke();
        ctx.closePath();


        ctx.beginPath();
        ctx.arc(100, 100, r1, Math.PI * 0, Math.PI * 2, false);
        ctx.closePath();
        ctx.fillStyle = "#eee";
        ctx.fill();
        ctx.stroke();
    }
    //ctx2 wave

    

        var a2 = document.getElementById('waveCanvas');
    var ctx2 = a2.getContext('2d');
    ctx2.canvas.width = window.innerWidth
    // ctx2.canvas.height = 200

    // ctx2.drawImage(PARAM);

    var h1 = 30,
        w1 = 400;
    drawWave(ctx2, h1, w1)



    function drawWave(ctx, h1, w1) {
        // body...
        var i = 0,
            j = -100;
        setInterval(function() {
            if (Math.round(i) == w1 * 200) {
                i = w1 / 60;
            } else {
                i += w1 / (60*2);
            }
            //j for sail
            if (j > window.innerWidth) {
                j = -100
            } else {
                j += w1 / (60);
            };
            drawSin(ctx, h1, w1, i, j)

        }, 30)

    }





    function drawSin(ctx, h1, w1, i, j) {
        // body...
        w = ctx.canvas.width
        h = ctx.canvas.height
        ctx.clearRect(0, 0, w, h);

        ctx.beginPath();
        // ctx.lineTo(0, 0);

        var b = Math.PI / w1;
        var c = w1 / 1.7;
        var d = 2 * w1 / 20;

        for (var x = 0; x < w + d; x += d) {
            var x1 = x - d / 2
            var y1 = h1 * Math.sin(b * (x1 + c - i)) + h1 + 10 + h1 * 0.6+600
            var y2 = h1 * Math.sin(b * (x + c - i)) + h1 + 10 + h1 * 0.6+600
            ctx.quadraticCurveTo(x1, y1, x, y2);

        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h);
        ctx.closePath();

        ctx.fillStyle = "rgba(0,150,200,0.5)";

        ctx.strokeStyle = "#1db6ff";

        ctx.fill();
        //draw sail
        ctx.beginPath();
        ctx.save();
        var img = document.getElementById('sail');
        var w2 = 37 * 1.9,
            h2 = 55 * 1.9;
        var sailx = j,
            saily = h1 * Math.sin(b * (sailx + c - i)) + h1 + 10 + h1 * 0.6+600
        ctx.translate(sailx, saily);
        var slope = b * h1 * Math.cos(b * (sailx + c - i))
        var degree = Math.atan(slope)
        ctx.rotate(degree);
        ctx.translate(-w2 / 2, -h2);

        ctx.drawImage(img, 0, 0, w2, h2);

        ctx.closePath();

        ctx.restore();
        //draw high wave
        ctx.beginPath();


        var b = Math.PI / w1;
        var c = w1 / 1.7;
        var d = 2 * w1 / 20;

        for (var x = 0; x < w + d; x += d) {
            var x1 = x - d / 2
            var y1 = h1 * Math.sin(b * (x1 + i)) + (h1 + 10)+600
            var y2 = h1 * Math.sin(b * (x + i)) + (h1 + 10)+600
            ctx.quadraticCurveTo(x1, y1, x, y2);

        }
        ctx.lineTo(w, h)
        ctx.lineTo(0, h);
        ctx.closePath();
        ctx.fillStyle = "rgba(0,150,200,0.5)";

        ctx.strokeStyle = "#1db6ff";

        ctx.fill();

    }

    window.onresize = function() {
        ctx2.canvas.width = window.innerWidth;
        //earth is round totally in presentation
        var $earth = $('.earth');
        var earthHeight = $('body').height()-40;
        var earthWidth = $('body').width()-40;
        if (earthHeight > earthWidth) {
            $earth.outerHeight(earthWidth);$earth.outerWidth(earthWidth)
        } else{
            $earth.outerHeight(earthHeight);$earth.outerWidth(earthHeight)
        };
         
      



    }
})
