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
 * @return {string}
 */
function puzzle1(arg1, arg2) {
  if (! isArray(arg1)) return '';
  if (! isString(arg2)) return '';

  var nArg1 = arg1.length,
    result = '';

  this.puzzle1Replace = function(str) {
    var replaceBegin = '<strong>',
      replaceAfter = '</strong>';

    return replaceBegin + str + replaceAfter;
  }

  if (nArg1 === 1) {
    var item = arg1[0];

    if (isContainStr(arg2, item)) {
      result = arg2.replace(item, this.puzzle1Replace(item));
    }

  } else if (nArg1 === 2) {
    var item1 = arg1[0],
      item2 = arg1[1],
      intersect = getIntersection(item1, item2);

    if (intersect) {

    } else {
      
    }
  }

  return result;
}

// trick for testing with mocha (in module pattern)
// http://stackoverflow.com/questions/14205631/how-do-i-test-a-basic-javascript-file-with-mocha
if (typeof module !== 'undefined' && module.exports != null) {
  exports.puzzle1 = puzzle1;
}
