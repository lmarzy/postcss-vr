var postcss = require('postcss');

function vr(fontSize, lineHeight) {
	var start  = Math.ceil(fontSize / lineHeight);
	var end    = lineHeight / fontSize;
	var result = start * end;

  return result;
}

module.exports = postcss.plugin('vr', function (opts) {

  opts = opts || { fontSize: 16, lineHeightMultiplier: 1.5, selectorBlackList: ['html'] };

  var PROP        = 'font-size';
  var PROP_ADD  	= 'line-height';
  var LINEHEIGHT  = opts.fontSize * opts.lineHeightMultiplier;

  return function(css) {

    css.walkRules(function(rule) {

      var isLineHeightAlreadyPresent  = false;

      rule.walkDecls(PROP_ADD, function (decl) {
        isLineHeightAlreadyPresent = true;
      });

      if(!isLineHeightAlreadyPresent) {

        rule.walkDecls(PROP, function (decl) {

          // Loop through each 'selectorBlackList' and if it matches with current selector return
          for(var i = 0; i < opts.selectorBlackList.length; i++) {
            if (opts.selectorBlackList[i] === decl.parent.selector) {
              return;
            }
          }

          // Get amount and strip off px unit
          var amount                = parseInt(decl.value, 10);
          var calculatedLineHeight  = vr(amount, LINEHEIGHT);
          var lineHeightToFixed     = calculatedLineHeight.toFixed(1);

          // Check to make sure the value is a number, if not return
          if(isNaN(amount)) return;

          // Check if the amount is equal to the options font size and if so return
          if(amount === opts.fontSize) return;

          // Check if the calculatedLineHeight is equal to the lineHeightToFixed and if so return
          if(opts.lineHeightMultiplier == lineHeightToFixed) return;

          // insert the rule into the page
          if(lineHeightToFixed === '1.0')
            rule.insertAfter(decl, { prop: PROP_ADD, value: calculatedLineHeight });
          else {
            rule.insertAfter(decl, { prop: PROP_ADD, value: calculatedLineHeight.toFixed(4) });
          }

        });

      }

    });

  }

});
