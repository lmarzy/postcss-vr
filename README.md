[PostCss](https://github.com/postcss/postcss)

A plugin that looks at all site font-size declarations and calculate a new line-height property to keep consistent vertical rhythm.

## Info

Vertical rhythm from a not technical point is 'a strong, regular, repeated pattern of movement or sound'.
In web design vertical rhythm is simply when a body of text is aligned to evenly spaced horizontal lines giving a site structure that guides the reader through the content. Vertical rhythm gives balance to a layout making content easier to read.

For further information please read [OpenBracket](http://www.openbracket.co.uk/vertical-rhythm)

```css
/* Input example */
.foo {
  font-size: 20px;
}
```

```css
/* Output example */
.foo {
  font-size: 20px;
  line-height: 1.2
}
```

## Usage

```js
const postcss   = require('postcss');
const vr        = require('postcss-vr');

//npm
"vr": "postcss -u postcss-vr -r 'output-dir'",

//webpack
postcss: [
  vr
]
```

The plugin will allow you to pass in your base font size, line height and any selectors you do not want to have a line height added, if none of these values are specified the plugin will use the default values of:

- font-size: 16px;
- line-height: 1.5;
- selectorBlackList: ['html']

To pass in your own values simply pass them in as follows

```js
const postcss   = require('postcss');
const vr        = require('postcss-vr');

//npm options.json
{
  "postcss-vr": {
    "fontSize": 20,
    "lineHeightMultiplier": 1.8
    "selectorBlackList": ['foo', 'bar', 'baz']
  }
}

"vr": "postcss -u postcss-vr -c options.json -r 'output-dir'",

//webpack
postcss: [
  vr(20, 1.8, ['foo', 'bar', 'baz'])
]
```
If a font-size is found that is not a value such as 'inherit' the plugin will ignore this value, it will also ignore the value specified for the default font size and will not write out the line heigh if it's the same as the base line height being used.
