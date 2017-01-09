//up-to-top btn
$(function() {
    var scrollTop1 = 0
    $(document).scroll(function() {
        $(document).scrollTop() > scrollTop1 ? ($('.up-to-top').removeClass('rise')) : ($('.up-to-top').addClass('rise'))
        scrollTop1 = $(document).scrollTop()
    })
    $('.up-to-top').click(function(event) {
        event.stopPropagation()
        $(document).scrollTop(0)
    })
})
//vue app
var app = new Vue({
        el: '#myApp',
        data: {
            storyExtra: {},
            comments: [],
            shortComments: [],
            isUp: false,
            seen: false,
            inputOverflow: 'hidden',
            myComment: '',
            a: 10
        },
        methods: {
            date: function(item) {
                var d = new Date(item.time * 1000)
                return d.dateFormat('MM-dd hh:mm')
            },
            turnUpOrDown: function() {
                this.isUp = !(this.isUp)
                this.seen = !(this.seen)
            },
            like: function(item, index, e) {
                if (item.isLiked == undefined) {
                    item.isLiked = false
                }
                item.isLiked = !item.isLiked
                    // var $likedComment = $('#comment' + index)
                    // var $number = $likedComment.prev()
                item.isLiked ? (item.likes += 1, item.color = '#13ACFF') : (item.likes -= 1, item.color = '#aaa');
                //badge rise
                if (item.isLiked) {
                    var badge = $("<span class='badge'>+1</span>")
                    $('body').append(badge)
                    var w = 24,
                        h = 16
                    badge.css({
                        'opacity': '1',
                        'width': w + 'px',
                        'height': h + 'px',
                        'position': 'absolute',
                        'top': (e.pageY - h) + 'px',
                        'left': (e.pageX - w / 2) + 'px',
                        'background': '#0ff'
                    })
                    badge.animate({
                        top: '-=60px',
                        opacity: '0'
                    }, 600, function() {
                        badge.remove()
                    })
                }
            },
            unfoldOrfold: function(item) {
                //item.likes+=100
                var a = item.pMaxH
                a == '100px' ? (item.foldTrigger = '收起', item.pMaxH = 'none') : (item.foldTrigger = '展开', item.pMaxH = '100px')
            },
            focus: function(event) {
                var input = $(event.target);
                if (window.innerWidth < 800) {
                    // var keyboardHeight = screen.height - window.innerHeight;
                    // $('.input-container').css('bottom', '200px');
                    var h = input[0].scrollHeight;
                    if (h < 100) {
                        input.css('height', h)
                    } else {
                        input.css('height', 100)
                        input.css('overflow', 'auto');
                    };
                } else {
                    input.css('overflow', 'auto');
                    input.animate({
                            height: '200px',
                        },
                        500);
                }
            },
            inputClick: function() {
                console.log('input click');
            },
            keyup: function() {
                var input = $('.input')
                if (window.innerWidth < 800) {
                    var h = input[0].scrollHeight;
                    if (h < 100) {
                        input.css('overflow', 'hidden');
                        input.height(h)
                    } else {
                        input.css('overflow', 'auto');
                    }
                } else {
                    input.css('overflow', 'auto');
                };
            },
            f1: function() {
                console.log('log f1')
            },
            blur1: function(event) {
                var input = $(event.target);
                input.css('overflow', 'hidden');
                if (window.innerWidth < 800) {
                    // var keyboardHeight = screen.height - window.innerHeight;
                    // $('.input-container').delay('fast').animate({bottom:'0'},'fast');
                    input.animate({
                            height: '30px'
                        },
                        500)
                    console.log(this.inputOverflow);
                } else {
                    input.animate({
                            height: '30px'
                        },
                        500
                    );
                };
            },
            publish: function() {
                if (this.myComment == '') {
                    return
                }
                var date = new Date()
                var ms = date.getTime() / 1000
                var comment = {
                    "author": "funny",
                    "content": this.myComment,
                    "avatar": "img/funny.jpg",
                    "time": ms,
                    "id": 0,
                    "likes": 0
                }
                if (this.myComment.length > 50) {
                    comment.foldTrigger = 'mine'
                    comment.pMaxH = 'none'
                    this.comments.splice(0, 0, comment)
                    this.storyExtra.long_comments += 1
                } else {
                    this.shortComments.splice(0, 0, comment)
                    this.storyExtra.short_comments += 1
                };
                //data update
                app.storyExtra.comments += 1
                    //then view update
                    //wait render to set bootstrap popover 
                this.$nextTick(popover)
                this.myComment = ''
            }
        },
        computed: {
            b: function() {
                return 2 * this.a
            }
        },
        watch: {
        }
    })
    //Date format(yyyy-MM-dd or other)
Date.prototype.dateFormat = function(fmt) {
        var list = {
            'M': this.getMonth() + 1,
            'd': this.getDate(),
            'h': this.getHours(),
            'm': this.getMinutes(),
            's': this.getSeconds()
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
        };
        for (var item in list) {
            if (new RegExp("(" + item + "+)").test(fmt)) {
                fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? list[item] : ('00' + list[item]).substr(('' + list[item]).length))
            }
        }
        var ms = this.getMilliseconds();
        if  (new  RegExp("(S+)").test(fmt))     fmt  =  fmt.replace(RegExp.$1,   (RegExp.$1.length  ==  1)  ?  (ms)       :  (("000"  +  ms).substr((""  +  ms).length)));  
        return fmt;
    }
    //http get data
axios.get('js/comments.json').then(function(response) {
    var arr = response.data.comments;
    for (var i = 0; i < arr.length; i++) {
        arr[i].foldTrigger = '展开'
        arr[i].pMaxH = '100px'
        arr[i].color = '#aaa'
    };
    app.comments = arr
    Vue.nextTick(popover)
}).catch(function(err) {
    console.log('get error:%s', err)
})
axios.get('js/short-comments.json').then(function(response) {
    var arr = response.data.comments;
    for (var i = 0; i < arr.length; i++) {
        arr[i].color = '#aaa'
    };
    app.shortComments = arr
    Vue.nextTick(popover)
}).catch(function(err) {
    console.log('get error:%s', err)
})
axios.get('js/story-extra.json').then(function(response) {
        app.storyExtra = response.data;
        for (var i = 0; i < app.storyExtra.long_comments; i++) {
            var content = $('#comment' + i).parent().next().children(':first')
                //determine whether to display 展开
            if (content.height() < 110) {
                content.parent().next().children('.unfold').hide()
            }
        };
    }).catch(function(err) {
        console.log('get error:%s', err)
    })
    //set popover
function popover() {
    var popover = $("[data-toggle='popover']")
    popover.popover();
    popover.each(function() {
        var imgsrc = $(this).attr('src')
        $(this).attr('data-content', "<img style='width:70px;height:70px;' src='" + imgsrc + "'/>")
        $(this).on('click', function(e) {
            e.stopPropagation();
        })
    })
}
//jQuery ready: onload onresize on..
$(function() {
    //onload
    var containerW = $('.container').width()
    $('.input-container').width(containerW)
    $('.input').width(containerW - 86)
    console.log('load:' + $('.input').width())
    //arrow size
    if (window.innerWidth > 1080) {
        $('#little-arrow1').hide();
        $('#little-arrow2').show()
    } else {
        $('#little-arrow1').show();
        $('#little-arrow2').hide()
    }
    //window resize
    window.onresize = function() {
        //resize input-container
        var containerW = $('.container').width()
        $('.input-container').width(containerW)
        $('.input').width(containerW - 86)
        console.log('resize' + $('.input').width())
        //resize arrow size
        if (window.innerWidth > 1080) {
            $('#little-arrow1').hide();
            $('#little-arrow2').show()
        } else {
            $('#little-arrow1').show();
            $('#little-arrow2').hide()
        }
        //determine show/hide unfold
        for (var i = 0; i < app.storyExtra.long_comments; i++) {
            var content = $('#comment' + i).parent().next().children(':first')
            if (content.height() < 110) {
                content.parent().next().children('.unfold').hide()
            } else {
                content.parent().next().children('.unfold').show()
            }
        }
    }
    //show circle
    $(document).click(function(e) {
        //hide popover
        $("[data-toggle='popover']").popover('hide')
            //add ring
        var w = 70;
        drawBubble(w);
        function drawBubble(width) {
            var ring = $('<div></div>')
            $('body').append(ring)
            ring.css({
                'opacity': '0.4',
                'width': w / 4 + 'px',
                'height': w / 4 + 'px',
                'border-radius': '50%',
                'position': 'absolute',
                'top': (e.pageY - 1 - w / 4 / 2) + 'px',
                'left': (e.pageX - 1 - w / 4 / 2) + 'px',
                'border': '1px solid #0ff',
                'background': '#0ff'
            })
            ring.animate({
                opacity: '0',
                width: w + 'px',
                height: w + 'px',
                top: (e.pageY - 1 - w / 2) + 'px',
                left: (e.pageX - 1 - w / 2) + 'px'
            }, 700, function() {
                ring.remove()
            })
        }
    })
})
//paint arrow on the canvas
var arrow1 = document.getElementById('little-arrow1');
var ctxa1 = arrow1.getContext('2d')
drawArrow(ctxa1, '#fff', 1)
var arrow2 = document.getElementById('little-arrow2');
var ctxa2 = arrow2.getContext('2d')
drawArrow(ctxa2, '#fff', 1)
function drawArrow(ctx, color, lineWidth) {
    var w = ctx.canvas.width,
        h = ctx.canvas.height
    ctx.beginPath();
    ctx.moveTo(w / 5, h / 6);
    ctx.lineTo(w / 2, h / 2);
    ctx.lineTo(4 * w / 5, h / 6);
    ctx.moveTo(w / 5, h / 2);
    ctx.lineTo(w / 2, 5 * h / 6);
    ctx.lineTo(4 * w / 5, h / 2);
    ctx.lineWidth = lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = color;
    ctx.stroke();
}
