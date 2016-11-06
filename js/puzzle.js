var _ = require('lodash'); // unused
var util = require('./util');

module.exports = {
  
  /**
   * Puzzle1
   * Support 1, 2 length(s) arg1's array
   * 
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {String}
   */
  puzzle1: function(arg1, arg2) {
    if (! util.isArray(arg1)) return '';
    if (! util.isString(arg2)) return '';

    var nArg1 = arg1.length,
      result = arg2,
      tmp = null,
      i = 0,
      j = 0,
      replaceBegin = '<strong>',
      replaceAfter = '</strong>';

    // TODO: test
    this.puzzle1Replace = function(str) {
      return replaceBegin + str + replaceAfter;
    }

    // need to ordered (item1Contain come first)
    // TODO: test
    this.puzzle1IsIntersect = function(item1Contain, item2Contain) {
      var item1 = {
        start   : item1Contain.offset,
        end     : item1Contain.offset + item1Contain.length,
      };
      var item2 = {
        start   : item2Contain.offset,
        end     : item2Contain.offset + item2Contain.length,
      }
      var result = (item1.end > item2.start);
      
      return result;
    }

    if (nArg1 === 1) {
      // case 1
      var item = arg1[0];

      if (util.isContainStr(arg2, item)) {
        result = arg2.replace(item, this.puzzle1Replace(item));
      }
    
    } else if (nArg1 === 2) {
      // case 2, 3, 4, 5, 6
      var item1 = arg1[0],
        item2 = arg1[1],
        item1Contain = util.getContainStr(arg2, item1),
        item2Contain = util.getContainStr(arg2, item2);

      var item1OccurredIndex = item1Contain.offset,
        item2OccurredIndex = item2Contain.offset,
        isContainItem1 = item1Contain.isContain,
        isContainItem2 = item2Contain.isContain;

      // no enough information
      if (item1 === item2) return arg2;

      if (isContainItem1 && isContainItem2) {
        // order
        if (item2OccurredIndex < item1OccurredIndex) {
          tmp = item1;
          item1 = item2;
          item2 = tmp;

          tmp = item1Contain;
          item1Contain = item2Contain;
          item2Contain = tmp;
          
          tmp = item1OccurredIndex;
          item1OccurredIndex = item2OccurredIndex;
          item2OccurredIndex = tmp;

          tmp = isContainItem1;
          isContainItem1 = isContainItem2;
          isContainItem2 = tmp;
        }

        // case 2, 3, 4
        var nItem1Occurred = util.getNOccurrences(arg2, item1),
          nItem2Occurred = util.getNOccurrences(arg2, item2);

        if (nItem1Occurred === 1 && nItem2Occurred === 1) {
          var isItem1Item2Intersect = this.puzzle1IsIntersect(item1Contain, item2Contain);

          if (isItem1Item2Intersect) {
            // case 3, 4

            // TODO: improve logic
            var find = '',
              replace = '',
              intersection = util.getIntersection(item1, item2),
              intersectionPhases = intersection.sequence;

            find = util.mergeIntersection(item1, item2);
            replace = util.mergeIntersection(item1, item2, replaceBegin, replaceAfter);

            result = arg2.replace(find, this.puzzle1Replace(replace));
           
          } else {
            // case 2

            // split it
            var parts = util.splitAndKeepDelimiter(arg2, item1),
              lastItem = parts[parts.length - 1];
            parts.splice(-1, 1); // remove last item from array
            tmp = util.splitAndKeepDelimiter(lastItem, item2);

            // the structor will be
            // XXXX item1 XXXX item2 XXXX
            var resultArr = parts.concat(tmp);

            // we can do in this way
            // cause it's a fixed structure
            resultArr[1] = resultArr[1].replace(item1, this.puzzle1Replace(item1));
            resultArr[3] = resultArr[3].replace(item2, this.puzzle1Replace(item2));

            result = resultArr.join('');
          }

        } else {
          // no enough information
        }

      } else {
        // case 5, 6
      }
    }

    return result;
  }
};
