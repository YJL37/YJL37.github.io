var startSeqs = {};
var startNum = 0;

// jQuery FN
$.fn.playSpin = function (options) {
    if (this.length) {
        if ($(this).is(':animated')) return; // Return false if this element is animating
        startSeqs['mainSeq' + (++startNum)] = {};
        $(this).attr('data-playslot', startNum);

        var total = this.length;
        var thisSeq = 0;

        // Initialize options
        if (typeof options == 'undefined') {
            options = new Object();
        }

        // Pre-define end nums
        var endNums = [];
        if (typeof options.endNum != 'undefined') {
            if ($.isArray(options.endNum)) {
                endNums = options.endNum;
            } else {
                endNums = [options.endNum];
            }
        }

        for (var i = 0; i < this.length; i++) {
            if (typeof endNums[i] == 'undefined') {
                endNums.push(0);
            }
        }

        startSeqs['mainSeq' + startNum]['totalSpinning'] = total;
        return this.each(function () {
            options.endNum = endNums[thisSeq];
            startSeqs['mainSeq' + startNum]['subSeq' + (++thisSeq)] = {};
            startSeqs['mainSeq' + startNum]['subSeq' + thisSeq]['spinning'] = true;
            var track = {
                total: total,
                mainSeq: startNum,
                subSeq: thisSeq
            };
            (new slotMachine(this, options, track));
        });
    }
};

$.fn.stopSpin = function () {
    if (this.length) {
        if (!$(this).is(':animated')) return; // Return false if this element is not animating
        if ($(this)[0].hasAttribute('data-playslot')) {
            $.each(startSeqs['mainSeq' + $(this).attr('data-playslot')], function(index, obj) {
                obj['spinning'] = false;
            });
        }
    }
};

var slotMachine = function (el, options, track) {
    var slot = this;
    slot.$el = $(el);

    slot.defaultOptions = {
        easing: 'swing',        // String: easing type for final spin
        time: 3000,             // Number: total time of spin animation
        loops: 6,               // Number: times it will spin during the animation
        manualStop: false,      // Boolean: spin until user manually click to stop
        useStopTime: false,     // Boolean: use stop time        
        stopTime: 5000,         // Number: total time of stop aniation
        stopSeq: 'random',      // String: sequence of slot machine end animation, random, leftToRight, rightToLeft
        endNum: 0,              // Number: animation end at which number/ sequence of list
        onEnd : $.noop,         // Function: run on each element spin end, it is passed endNum
        onFinish: $.noop,       // Function: run on all element spin end, it is passed endNum
    };

    slot.spinSpeed = 0;
    slot.loopCount = 0;

    slot.init = function () {
        slot.options = $.extend({}, slot.defaultOptions, options);
        slot.setup();
        slot.startSpin();
    };

    slot.setup = function () {
        var $li = slot.$el.find('li').first();
        slot.liHeight = $li.innerHeight();
        slot.liCount = slot.$el.children().length;
        slot.listHeight = slot.liHeight * slot.liCount;
        slot.spinSpeed = slot.options.time / slot.options.loops;

        $li.clone().appendTo(slot.$el); // Clone to last row for smooth animation

        // Configure stopSeq
        if (slot.options.stopSeq == 'leftToRight') {
            if (track.subSeq != 1) {
                slot.options.manualStop = true;
            }
        } else if (slot.options.stopSeq == 'rightToLeft') {
            if (track.total != track.subSeq) {
                slot.options.manualStop = true;
            }
        }
    };

    slot.startSpin = function () {
        slot.$el
            .css('top', -slot.listHeight)
            .animate({'top': '0px'}, slot.spinSpeed, 'linear', function () {
                slot.lowerSpeed();
            });
    };

    slot.lowerSpeed = function () {
        slot.loopCount++;

        if (slot.loopCount < slot.options.loops ||
            (slot.options.manualStop && startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['spinning'])) {
            slot.startSpin();
        } else {
            slot.endSpin();
        }
    };

    slot.endSpin = function () {
        if (slot.options.endNum == 0) {
            slot.options.endNum = slot.randomRange(1, slot.liCount);
        }

        // Error handling if endNum is out of range
        if (slot.options.endNum < 0 || slot.options.endNum > slot.liCount) {
            slot.options.endNum = 1;
        }

        var finalPos = -((slot.liHeight * slot.options.endNum) - slot.liHeight);
        var finalTime = ((slot.spinSpeed * 1.5) * (slot.liCount)) / slot.options.endNum;
        if (slot.options.useStopTime) {
            finalTime = slot.options.stopTime;
        }

        slot.$el
            .css('top', -slot.listHeight)
            .animate({'top': finalPos}, parseInt(finalTime), slot.options.easing, function () {
                slot.$el.find('li').last().remove(); // Remove the cloned row

                slot.endAnimation(slot.options.endNum);
                if ($.isFunction(slot.options.onEnd)) {
                    slot.options.onEnd(slot.options.endNum);
                }

                // onFinish is every element is finished animation
                if (startSeqs['mainSeq' + track.mainSeq]['totalSpinning'] == 0) {
                    var totalNum = '';
                    $.each(startSeqs['mainSeq' + track.mainSeq], function(index, subSeqs) {
                        if (typeof subSeqs == 'object') {
                            totalNum += subSeqs['endNum'].toString();
                        }
                    });
                    if ($.isFunction(slot.options.onFinish)) {
                        slot.options.onFinish(totalNum);
                    }
                }
            });
    }

    slot.endAnimation = function(endNum) {
        if (slot.options.stopSeq == 'leftToRight' && track.total != track.subSeq) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq + 1)]['spinning'] = false;
        } else if (slot.options.stopSeq == 'rightToLeft' && track.subSeq != 1) {
            startSeqs['mainSeq' + track.mainSeq]['subSeq' + (track.subSeq - 1)]['spinning'] = false;
        }
        startSeqs['mainSeq' + track.mainSeq]['totalSpinning']--;
        startSeqs['mainSeq' + track.mainSeq]['subSeq' + track.subSeq]['endNum'] = endNum;
    }

    slot.randomRange = function (low, high) {
        return Math.floor(Math.random() * (1 + high - low)) + low;
    };

    this.init();
};

$('#btn-example1').click(function() {
   $('#example1 ul').playSpin({
     endNum: 7
  });
  initAnimation()
});

function initAnimation() {
    numMoney = 300
    speedOffset = 10
    speedRange = 5
    numImages = 6
    frameRate = 1000 / 30 // 30 frames per second
    animationLength = 10000 // 10 seconds
    
    canvasContext = $('.rain')[0].getContext('2d')
  
    _.range(numMoney).forEach(function (index) {
      
      isOdd = index % 2 == 1
      direction = 0;
      if(isOdd)
        direction = 1;
      else
        direction = -1;
      
      money = {
        image: new Image(),
        x: _.random(width),
        y: _.random(-height * 1, -imageHeight),
        angle: _.random(2 * Math.PI),
        speed: speedOffset + _.random(speedRange),
        currentFrame: 0,
        direction: direction
      }
  
      imageIndex = _.random(numImages)
      // money.image.src = "https://dl.dropboxusercontent.com/u/58679421/make_it_rain_images/money_" + 
      //   imageIndex + ".png"
      money.image.src = "https://images.vexels.com/media/users/3/144032/isolated/preview/1f5414b9d04b71a4972208c035a7d278-stroke-dollar-bill-by-vexels.png"
          // money.image.src = "https://bangbroschat.com/svg/coin.svg"
      fallingMoney.push(money)
    })
  
    interval = setInterval(function() {
      draw()  
    }, frameRate)
    
    setTimeout(function() {
      endAnimation()
    }, animationLength)
  }
  
  function draw() {
    clearWindow()
    
    fallingMoney.forEach(function(money, index) {
      drawRotatedImage(money)
      
      money.currentFrame += 1
      money.y += money.speed
      money.angle += money.direction * 0.1
      radius = money.direction * (10 + (index % 6))
      money.x += Math.sin((money.currentFrame + index) / (2 * Math.PI)) * radius 
    })
  }
                         
  function clearWindow() {
    canvasContext.clearRect(0, 0, width, height)
  }
    
  function drawRotatedImage(money) {
    canvasContext.save()
    canvasContext.translate(money.x, money.y)
    canvasContext.rotate(money.angle)
    canvasContext.drawImage(money.image, 0, 0, 100, 100 * money.image.height / money.image.width)
    canvasContext.restore()
  }
  
  function endAnimation() {
    clearInterval(interval)
    fallingMoney = []
    canvas.detach()
  }