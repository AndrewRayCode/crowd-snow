crowd-snow
==========

A real man's javascript snow library. No images. No IE support.

## Demo

[Demo on jsFiddle](http://jsfiddle.net/delvarworld/vcex8/1/)

## Usage

Include `snow.js` and `snow.css`

Suggested markup

    <div id="snow" class="snow">
    </div>

Suggested css

    .snow {
        color:#fff;
        position:relative;
        width:400px; /* whatever you want */
        height:500px; /* whatever you want */
    }

Then DO IT

    $('#snow').snow();

Then STOP IT

    $('#snow').stopSnowing();

## Options

flakeCount

    The number of flakes
    
minDiameter

    The minimum snowflake diameter (translates to height / width / font-size)

maxDiameter

    The maximum snowflake diameter (translates to height / width / font-size)

minOpacity

    Minimum flake opacity

maxOpacity

    Maximum flake opacity

## Credits

Based loosely on [CSS3-Snowflakes](https://github.com/dmolsen/CSS3-Snowflakes)
