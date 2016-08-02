/**
 * [createGrid description]
 * NOT TESTED
 * 
 * @see http://stackoverflow.com/questions/2250942/javascript-string-matching-pattern-help
 * 
 * @param  {[type]} rows    [description]
 * @param  {[type]} columns [description]
 * @return {[type]}         [description]
 */
function createGrid(rows, columns) {
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
}

/**
 * [removeLastItemFromArray description]
 * NOT TESTED
 * 
 * @param  {[type]} arr [description]
 * @return {[type]}     [description]
 */
function removeLastItemFromArray(arr) {
  return arr.splice(-1, 1);
}

/**
 * [getNOccurrences description]
 * NOT TESTED
 * 
 * @see http://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
 * 
 * @param  {[type]} string           [description]
 * @param  {[type]} subString        [description]
 * @param  {[type]} allowOverlapping [description]
 * @return {[type]}                  [description]
 */
function getNOccurrences(string, subString, allowOverlapping) {
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
}

/**
 * [splitAndKeepDelimiter description]
 * NOT TESTED
 * 
 * @param  {[type]} str       [description]
 * @param  {[type]} delimiter [description]
 * @return {[type]}           [description]
 */
function splitAndKeepDelimiter(str, delimiter) {
  var parts = str.split(delimiter),
    i = 0;

  for (i = parts.length; i-- > 1;) {
    parts.splice(i, 0, delimiter);
  }

  return parts;
}

/**
 * [getIntersection description]
 * NOT TESTED
 * 
 * @see http://stackoverflow.com/questions/2250942/javascript-string-matching-pattern-help
 * 
 * @param  {[type]} str1 [description]
 * @param  {[type]} str2 [description]
 * @return {[type]}      [description]
 */
function getIntersection(str1, str2) {
  var nStr1 = str1.length,
    nStr2 = str2.length,
    grid = createGrid(str1.length, str2.length),
    longest = 0,
    matches = '',
    i,
    j;

  for (i = 0; i < nStr1; i++) {
    for (j = 0; j < nStr2; j++) {
      if (str1.charAt(i) == str2.charAt(j)) {
        if (i == 0 || j == 0) {
          grid[i][j] = 1;

        } else {
          grid[i][j] = grid[i - 1][j - 1] + 1;
        }

        if (grid[i][j] > longest) {
          longest = grid[i][j];
          matches = '';
        }
        
        if (grid[i][j] == longest) {
          var match = str1.substring(i - longest + 1, i);
          matches = match;
        }
      }
    }
  }

  return matches;
}

/**
 * [isContainStr description]
 * NOT TESTED
 * UNUSED
 * 
 * @see http://stackoverflow.com/questions/1789945/how-to-check-if-one-string-contains-another-substring-in-javascript
 * 
 * @param  {[type]}  str    [description]
 * @param  {[type]}  needle [description]
 * @return {Boolean}        [description]
 */
function isContainStr(str, needle) {
  return (str.indexOf(needle) !== -1);
}

/**
 * [isArray description]
 * NOT TESTED
 * 
 * @see http://stackoverflow.com/questions/4775722/check-if-object-is-array
 * 
 * @param  {[type]}  arr [description]
 * @return {Boolean}     [description]
 */
function isArray(arr) {
  return (arr instanceof Array);
}

/**
 * [isString description]
 * NOT TESTED
 *
 * @see http://stackoverflow.com/questions/4059147/check-if-a-variable-is-a-string
 * 
 * @param  {[type]}  str [description]
 * @return {Boolean}     [description]
 */
function isString(str) {
  return (typeof str === 'string');
}

/**
 * Puzzle1
 * Support 1, 2 length(s) arg1's array
 * 
 * @param  {[type]} arg1 [description]
 * @param  {[type]} arg2 [description]
 * @return {String}
 */
function puzzle1(arg1, arg2) {
  if (! isArray(arg1)) return '';
  if (! isString(arg2)) return '';

  var nArg1 = arg1.length,
    result = arg2,
    tmp = null,
    i = 0,
    j = 0;

  this.puzzle1Replace = function(str) {
    var replaceBegin = '<strong>',
      replaceAfter = '</strong>';

    return replaceBegin + str + replaceAfter;
  }

  if (nArg1 === 1) {
    // case 1
    var item = arg1[0];

    if (isContainStr(arg2, item)) {
      result = arg2.replace(item, this.puzzle1Replace(item));
    }
  
  } else if (nArg1 === 2) {
    // case 2, 3, 4, 5, 6
    var item1 = arg1[0],
      item2 = arg1[1],
      item1OccurredIndex = arg2.indexOf(item1),
      item2OccurredIndex = arg2.indexOf(item2),
      isContainItem1 = (item1OccurredIndex !== -1),
      isContainItem2 = (item2OccurredIndex !== -1),
      intersect = getIntersection(item1, item2);

    // no enough information
    if (item1 === item2) return arg2;

    if (isContainItem1 && isContainItem2) {
      // order
      if (item2OccurredIndex < item1OccurredIndex) {
        tmp = item1;
        item1 = item2;
        item2 = tmp;
        
        tmp = item1OccurredIndex;
        item1OccurredIndex = item2OccurredIndex;
        item2OccurredIndex = tmp;
      }

      // case 2, 3, 4
      var nItem1Occurred = getNOccurrences(arg2, item1),
        nItem2Occurred = getNOccurrences(arg2, item2);

      if (nItem1Occurred === 1 && nItem2Occurred === 1) {
        if (intersect) {
          // case 3, 4
          /*
          3 | ["abbbbb", "bbbbbc"]  | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx"
          4 | ["abbbbb", "bbb"]     | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbb</strong>bb</strong>cxxx"
          */
         
        } else {
          // case 2
          
          // split it
          var parts = splitAndKeepDelimiter(arg2, item1),
            lastItem = parts[parts.length - 1];
          parts.splice(-1, 1); // remove last item from array
          tmp = splitAndKeepDelimiter(lastItem, item2);

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

// trick for testing with mocha (in module pattern)
// http://stackoverflow.com/questions/14205631/how-do-i-test-a-basic-javascript-file-with-mocha
if (typeof module !== 'undefined' && module.exports != null) {
  exports.puzzle1 = puzzle1;
}