var _ = require('lodash'); // unused

module.exports = {
  
  /**
   * [createGrid description]
   * UNUSED
   * 
   * @see http://stackoverflow.com/questions/2250942/javascript-string-matching-pattern-help
   * 
   * @param  {[type]} rows    [description]
   * @param  {[type]} columns [description]
   * @return {[type]}         [description]
   */
  createGrid: function(rows, columns) {
    var grid = new Array(rows),
      i,
      j;
    
    for (i = 0; i < rows; i++) {
      grid[i] = new Array(columns);
      
      for (j = 0; j < columns; j++) {
        grid[i][j] = 0;
      }
    }

    return grid;
  },

  /**
   * [replaceLastOccurrence description]
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace
   * 
   * @param  {[type]} str     [description]
   * @param  {[type]} find    [description]
   * @param  {[type]} replace [description]
   * @return {[type]}         [description]
   */
  replaceLastOccurrence: function(str, find, replace) {
    var result = str,
      n = str.lastIndexOf(find);

    result = str.slice(0, n) + str.slice(n).replace(find, replace);

    return result;
  },

  /**
   * [mergeIntersection description]
   * need to be
   * - intersected
   * - ordered
   * 
   * @param  {[type]} str1 [description]
   * @param  {[type]} str2 [description]
   * @return {[type]}      [description]
   */
  mergeIntersection: function(str1, str2, empBeginStr, empAfterStr) {
    var result = str1;
    var isStr1ContainStr2 = this.isContainStr(str1, str2);
    var hasEmp = (empBeginStr && empAfterStr);
   
    if (isStr1ContainStr2) {
      if (hasEmp) {
        result = str1.replace(str2, empBeginStr + str2 + empAfterStr);
      }

    } else {
      var intersection = this.getIntersection(str1, str2),
        intersectionPhases = intersection.sequence;

      if (hasEmp) {
        var tmp1 = this.replaceLastOccurrence(str1, intersectionPhases, empBeginStr + intersectionPhases + empAfterStr),
          tmp2 = str2.replace(intersectionPhases, '');

        result = tmp1 + tmp2;

      } else {
        result = this.replaceLastOccurrence(str1, intersectionPhases, '') + str2;
      }
    }

    return result;
  },

  /**
   * [getNOccurrences description]
   * 
   * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
   * 
   * @param  {[type]} string           [description]
   * @param  {[type]} subString        [description]
   * @param  {[type]} allowOverlapping [description]
   * @return {[type]}                  [description]
   */
  getNOccurrences: function(string, subString, allowOverlapping) {
    string += '';
    subString += '';

    if (subString.length <= 0) return 0;

    var n = 0,
      pos = 0,
      step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);

      if (pos >= 0) {
        ++n;
        pos += step;

      } else {
        break;
      }
    }

    return n;
  },

  /**
   * [splitAndKeepDelimiter description]
   * 
   * @param  {[type]} str       [description]
   * @param  {[type]} delimiter [description]
   * @return {[type]}           [description]
   */
  splitAndKeepDelimiter: function(str, delimiter) {
    var parts = str.split(delimiter),
      i = 0;

    for (i = parts.length; i-- > 1;) {
      parts.splice(i, 0, delimiter);
    }

    return parts;
  },

  /**
   * [getIntersection description]
   * 
   * @param  {[type]} str1 [description]
   * @param  {[type]} str2 [description]
   * @return {[type]}      [description]
   */
  getIntersection: function(str1, str2) {
    return this.getLongestCommonSubstring(str1, str2);
  },

  /**
   * [longestCommonSubstring description]
   *
   * @see https://en.wikibooks.org/wiki/Algorithm_Implementation/Strings/Longest_common_substring
   * @see http://stackoverflow.com/questions/2250942/javascript-string-matching-pattern-help
   *  
   * @param  {[type]} str1 [description]
   * @param  {[type]} str2 [description]
   * @return {[type]}      [description]
   */
  getLongestCommonSubstring: function(str1, str2) {
    var result = {
      length    : 0,
      sequence  : '',
      offset    : 0
    };

    if (!str1 || !str2) return result;
 
    var sequence = '',
      str1Length = str1.length,
      str2Length = str2.length,
      num = new Array(str1Length),
      maxlen = 0,
      lastSubsBegin = 0;
 
    for (var i = 0; i < str1Length; i++) {
      var subArray = new Array(str2Length);

      for (var j = 0; j < str2Length; j++) {
        subArray[j] = 0;  
      }

      num[i] = subArray;
    }

    var thisSubsBegin = 0;

    for (var i = 0; i < str1Length; i++) {
      for (var j = 0; j < str2Length; j++) {
        if (str1[i] !== str2[j]) {
          num[i][j] = 0;  

        } else {
          if ((i === 0) || (j === 0)) {
            num[i][j] = 1;

          } else {
            num[i][j] = 1 + num[i - 1][j - 1];
          }

          if (num[i][j] > maxlen) {
            maxlen = num[i][j];
            thisSubsBegin = i - num[i][j] + 1;

            // if the current LCS is the same as the last time this block ran
            if (lastSubsBegin === thisSubsBegin) {
              sequence += str1[i];

            // this block resets the string builder if a different LCS is found
            } else {
              lastSubsBegin = thisSubsBegin;
              sequence = ''; //clear it
              sequence += str1.substr(lastSubsBegin, (i + 1) - lastSubsBegin);
            }
          }
        }
      }
    }

    var result = {
      length    : maxlen,
      sequence  : sequence,
      offset    : thisSubsBegin
    };

    return result;
  },

  /**
   * [isContainStr description]
   * 
   * @see http://stackoverflow.com/questions/1789945/how-to-check-if-one-string-contains-another-substring-in-javascript
   * 
   * @param  {[type]}  str    [description]
   * @param  {[type]}  needle [description]
   * @return {Boolean}        [description]
   */
  isContainStr: function(str, needle) {
    return (str.indexOf(needle) !== -1);
  },

  /**
   * [getContainStr description]
   * 
   * @param  {[type]} str    [description]
   * @param  {[type]} needle [description]
   * @return {[type]}        [description]
   */
  getContainStr: function(str, needle) {
    var result = {
      length    : needle.length,
      offset    : -1,
      isContain : false
    };

    result.offset = str.indexOf(needle);
    result.isContain = (result.offset !== -1);

    return result;
  },

  /**
   * [isArray description]
   * 
   * @see http://stackoverflow.com/questions/4775722/check-if-object-is-array
   * 
   * @param  {[type]}  arr [description]
   * @return {Boolean}     [description]
   */
  isArray: function(arr) {
    return (arr instanceof Array);
  },

  /**
   * [isString description]
   *
   * @see http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string
   * 
   * @param  {[type]}  str [description]
   * @return {Boolean}     [description]
   */
  isString: function(str) {
    return (typeof str === 'string');
  },

  /**
   * Puzzle1
   * Support 1, 2 length(s) arg1's array
   * 
   * @param  {[type]} arg1 [description]
   * @param  {[type]} arg2 [description]
   * @return {String}
   */
  puzzle1: function(arg1, arg2) {
    if (! this.isArray(arg1)) return '';
    if (! this.isString(arg2)) return '';

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

      if (this.isContainStr(arg2, item)) {
        result = arg2.replace(item, this.puzzle1Replace(item));
      }
    
    } else if (nArg1 === 2) {
      // case 2, 3, 4, 5, 6
      var item1 = arg1[0],
        item2 = arg1[1],
        item1Contain = this.getContainStr(arg2, item1),
        item2Contain = this.getContainStr(arg2, item2);

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
        var nItem1Occurred = this.getNOccurrences(arg2, item1),
          nItem2Occurred = this.getNOccurrences(arg2, item2);

        if (nItem1Occurred === 1 && nItem2Occurred === 1) {
          var isItem1Item2Intersect = this.puzzle1IsIntersect(item1Contain, item2Contain);

          if (isItem1Item2Intersect) {
            // case 3, 4

            // TODO: improve logic
            var find = '',
              replace = '',
              intersection = this.getIntersection(item1, item2),
              intersectionPhases = intersection.sequence;

            find = this.mergeIntersection(item1, item2);
            replace = this.mergeIntersection(item1, item2, replaceBegin, replaceAfter);

            result = arg2.replace(find, this.puzzle1Replace(replace));
           
          } else {
            // case 2

            // split it
            var parts = this.splitAndKeepDelimiter(arg2, item1),
              lastItem = parts[parts.length - 1];
            parts.splice(-1, 1); // remove last item from array
            tmp = this.splitAndKeepDelimiter(lastItem, item2);

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
