 window.onload = function() {
     var $earth = $('.earth');
        var earthHeight = $('body').height()-40;
        var earthWidth = $('body').width()-40;
        if (earthHeight > earthWidth) {
            $earth.outerHeight(earthWidth);$earth.outerWidth(earthWidth)
        } else{
            $earth.outerHeight(earthHeight);$earth.outerWidth(earthHeight)
        };
 
     earthRotate()

     function earthRotate() {
         // body...
         $earth.animate({
             backgroundPositionX: 2 * $earth.width()
         }, 9000, 'linear', function() {
             $earth.css({ 'background-position': '0 0' });
             earthRotate()

         });
     }

     function f1() {
         alert('dfs')
     }
     $(document).scroll(scroll1);

     function scroll1() {
         $(document).off('scroll')
         var top = $(document).scrollTop()
         var h = $('body:first').height()

         if (top % h < 200) {
             var n = Math.ceil(top / h)
             f1(h, n, -1)
         } else {
             var n = Math.floor(top / h)
             f1(h, n, 1)
         };


     }


     function f1(h, n, j) {
         // body...
         var i = 0

         var set1 = setInterval(function() {
             // body...
             ++i;
             var b1 = $(document).scrollTop()
             var b = Math.abs(b1 - h * n)
             if (b < 5) {
                 $(document).scroll(scroll1);
                 clearInterval(set1)
             } else {

                 $(document).scrollTop(h * (n + j) + (-j) * h * i / 20)
             };


         }, 10)
     }



 }
