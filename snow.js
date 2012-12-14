(function() {

var randInt = function(from, to) {
    return Math.floor(Math.random() * (to - from + 1) + from);
};

// finds the keyframe we want to update
// http://blog.joelambert.co.uk/2011/09/07/accessing-modifying-css3-animations-with-javascript/
var findKeyframeAnimation = function(a) {
    var ss = document.styleSheets;
    for (var i = ss.length - 1; i >= 0; i--) {
        try {
            var s = ss[i],
                rs = s.cssRules ? s.cssRules :
                     s.rules ? s.rules :
                     [];

            for (var j = rs.length - 1; j >= 0; j--) {
                if ((rs[j].type === window.CSSRule.WEBKIT_KEYFRAMES_RULE ||
                        rs[j].type === window.CSSRule.MOZ_KEYFRAMES_RULE) && rs[j].name == a) {
                    return rs[j];
                }
            }
        // Trying to interrogate a stylesheet from another domain will throw a
        // security error
        } catch(e) {}
    }
    return null;
};

$.fn.snow = function(options) {
    options = options || {};
    var me = this,
        count = options.flakeCount || 20,
        minDiameter = options.minDiameter || 20,
        maxDiameter = options.maxDiameter || 35,
        minOpacity = options.minOpacity || 50,
        maxOpacity = options.maxOpacity || 100,
        height = this.height(),
        webkit = $.browser.webkit,
        flakes = [];

    var characters = ['&#10052;', '&#10053;', '&#10054;', '*'];

    // updates the Keyframe Height for the 'falling' animation in snowflakes.css so
    // snowflakes fall the full height of a page
    var updateKeyframeHeight = function() {
        var keyframes;
        if (keyframes = findKeyframeAnimation('falling')) {
            if (webkit) {
                var newRule = '100% { -webkit-transform: translate3d(0,' +
                    height + 'px,0) rotate(360deg); }';
            } else if (keyframes.cssText.match(new RegExp('moz'))) {
                var newRule = '-moz-transform: translate(0,' + height + 'px) rotate(360deg);';
            }
            keyframes.insertRule(newRule);
        }
    };

    updateKeyframeHeight();

    var i = count, size, css, origin;
    while (i--) {
        size = randInt(minDiameter, maxDiameter);
        origin = size / 2;
        css = {
            left: randInt(0, 100) + '%',
            'font-size': size + 'px',
            height: size + 'px',
            width: size + 'px',
            opacity: randInt(minOpacity, maxOpacity) * 0.01,
            top: (-size - 20) + 'px'
        };

        if(webkit) {
            css['-webkit-transform-origin'] = origin + 'px ' + origin + 'px';
            css['-webkit-animation-delay'] = (Math.random() * 10) + 's';
        } else {
            css['-moz-transform-origin'] = origin + 'px ' + origin + 'px';
            css['-mox-animation-delay'] = (Math.random() * 10) + 's';
        }
        flakes.push($('<div></div>').html(characters[randInt(0, characters.length - 1)]).attr({
            'class': 'snowflake'
        }).css(css).appendTo(this));
    }

    this.data('snow', {
        flakes: flakes
    });

    return this;
};

$.fn.stopSnowing = function() {
    $.each(this.data('snow').flakes, function(i, flake) {
        $(flake).remove();
    });
};

}());
