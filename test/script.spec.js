var chai = require('chai'),
  expect = chai.expect;

var app = require('../js/script');

describe('createGrid', function() {
  before(function() {
    var arg1 = 0,
      arg2 = 0,
      expected = {};
  });

  it('Empty Grid', function() {
    arg1 = 0;
    arg2 = 0;
    expected = [];
    expect(app.createGrid(arg1, arg2)).eql(expected);
  });

  it('Not empty Grid', function() {
    arg1 = 2;
    arg2 = 3;
    expected = [
      [0, 0, 0],
      [0, 0, 0]
    ];
    expect(app.createGrid(arg1, arg2)).eql(expected);
  });
});

describe('replaceLastOccurrence', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      arg3 = '',
      expected = '';
  });

  it('Have occurrence', function() {
    arg1 = 'xxxBOXxxxBOX';
    arg2 = 'BOX';
    arg3 = '';
    expected = 'xxxBOXxxx'
    expect(app.replaceLastOccurrence(arg1, arg2, arg3)).equal(expected);

    arg1 = 'abc def abc xyz';
    arg2 = 'abc';
    arg3 = 'test';
    expected = 'abc def test xyz'
    expect(app.replaceLastOccurrence(arg1, arg2, arg3)).equal(expected);

    // case-sensitive
    arg1 = 'abc ABC abc abc';
    arg2 = 'ABC';
    arg3 = 'test';
    expected = 'abc test abc abc';
    expect(app.replaceLastOccurrence(arg1, arg2, arg3)).equal(expected);
  });

  it('Not have occurrence', function() {
    arg1 = 'abc ABC abc abc';
    arg2 = 'AbC';
    arg3 = 'test';
    expected = 'abc ABC abc abc';
    expect(app.replaceLastOccurrence(arg1, arg2, arg3)).equal(expected);
  });
});

describe('mergeIntersection', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      arg3 = '',
      arg4 = '',
      expected = '';
  });

  it('Arg1 cover arg2', function() {
    arg1 = 'aabbbb';
    arg2 = 'bb';
    expected = 'aabbbb'
    expect(app.mergeIntersection(arg1, arg2)).equal(expected);

    arg1 = 'aabbbbccc';
    arg2 = 'bc';
    expected = 'aabbbbccc'
    expect(app.mergeIntersection(arg1, arg2)).equal(expected);
  });

  it('Arg1 not cover arg2', function() {
    arg1 = 'aabbbbccc';
    arg2 = 'bccccc';
    expected = 'aabbbbccccc';
    expect(app.mergeIntersection(arg1, arg2)).equal(expected);
  });

  it('Arg1 cover arg2 + emphasize', function() {
    arg1 = 'abcde';
    arg2 = 'bc';
    arg3 = '<a>';
    arg4 = '<b>';
    expected = 'a<a>bc<b>de';
    expect(app.mergeIntersection(arg1, arg2, arg3, arg4)).equal(expected);

    // replace only first occur
    arg1 = 'aabbbb';
    arg2 = 'bb';
    arg3 = '<a>';
    arg4 = '</a>';
    expected = 'aa<a>bb</a>bb';
    expect(app.mergeIntersection(arg1, arg2, arg3, arg4)).equal(expected);
  });

  it('Arg1 not cover arg2 + emphasize', function() {
    arg1 = 'xxxxxaaaa';
    arg2 = 'aaavvv';
    arg3 = '<W>';
    arg4 = '<E>';
    expected = 'xxxxxa<W>aaa<E>vvv';
    expect(app.mergeIntersection(arg1, arg2, arg3, arg4)).equal(expected);
  });
});

describe('getNOccurrences', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      expected = '';
  });

  it('allowOverlapping = false (default)', function() {
    arg1 = 'foofoofoo';
    arg2 = 'bar';
    expected = 0;
    expect(app.getNOccurrences(arg1, arg2)).equal(expected);

    arg1 = 'foofoofoo';
    arg2 = 'foo';
    expected = 3;
    expect(app.getNOccurrences(arg1, arg2)).equal(expected);

    arg1 = 'foofoofoo';
    arg2 = 'foofoo';
    expected = 1;
    expect(app.getNOccurrences(arg1, arg2)).equal(expected);
  });

  it('allowOverlapping = true', function() {
    arg1 = 'foofoofoo';
    arg2 = 'foofoo';
    expected = 2;
    expect(app.getNOccurrences(arg1, arg2, true)).equal(expected);
  });
});

describe('splitAndKeepDelimiter', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      expected = [];
  });

  it('Occur once', function() {
    arg1 = 'xxxaaxx';
    arg2 = 'aa';
    expected = ['xxx', 'aa', 'xx'];
    expect(app.splitAndKeepDelimiter(arg1, arg2)).eql(expected);
  });

  it('Occur more than once', function() {
    arg1 = 'xxxaaxxaaxxxx';
    arg2 = 'aa';
    expected = ['xxx', 'aa', 'xx', 'aa', 'xxxx'];
    expect(app.splitAndKeepDelimiter(arg1, arg2)).eql(expected);
  });
});

describe('getLongestCommonSubstring', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      expected = {};
  });

  it('Intersect', function() {
    arg1 = 'abbb';
    arg2 = 'bbc';
    expected = {
      length    : 2,
      sequence  : 'bb',
      offset    : 1
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);

    arg1 = 'abbbbb';
    arg2 = 'bbbbbc';
    expected = {
      length    : 5,
      sequence  : 'bbbbb',
      offset    : 1
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);

    arg1 = 'bbbbb';
    arg2 = 'bbb';
    expected = {
      length    : 3,
      sequence  : 'bbb',
      offset    : 0
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);
    
    arg1 = 'Here is a quick guide for the next time you reach for your favorite oil and some other topics';
    arg2 = 'favorite oil and some other topics can be based on something blah blah';
    expected = {
      length    : 34,
      sequence  : 'favorite oil and some other topics',
      offset    : 59
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);

    arg1 = '123456';
    arg2 = '789511';
    expected = {
      length    : 1,
      sequence  : '1',
      offset    : 0
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);

    // return first occur
    arg1 = 'abbbbb';
    arg2 = 'bbb';
    expected = {
      length    : 3,
      sequence  : 'bbb',
      offset    : 1
    };
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);
  });

  it('Not intersect', function() {
    expected = {
      length    : 0,
      sequence  : '',
      offset    : 0
    };

    arg1 = '123456';
    arg2 = '78900';
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);

    arg1 = 'qwertyipp';
    arg2 = 'asdlg;hk';
    expect(app.getLongestCommonSubstring(arg1, arg2)).eql(expected);
  });
});

describe('isContainStr', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      expected = false;
  });

  it('Contain', function() {
    arg1 = 'qwertyui';
    arg2 = 'yui';
    expected = true;
    expect(app.isContainStr(arg1, arg2)).equal(expected);
  });

  it('Not contain', function() {
    arg1 = 'qwertyui';
    arg2 = 'fgh';
    expected = false;
    expect(app.isContainStr(arg1, arg2)).equal(expected);
  });
});

describe('getContainStr', function() {
  before(function() {
    var arg1 = '',
      arg2 = '',
      expected = {};
  });

  it('Contain', function() {
    arg1 = 'xxxxaaxx';
    arg2 = 'aa';
    expected = {
      length    : 2,
      offset    : 4,
      isContain : true
    };
    expect(app.getContainStr(arg1, arg2)).eql(expected);
  });

  it('Not contain', function() {
    arg1 = 'xxxxaaxx';
    arg2 = 'bb';
    expected = {
      length    : 2,
      offset    : -1,
      isContain : false
    };
    expect(app.getContainStr(arg1, arg2)).eql(expected);

    // longer
    arg1 = 'xxxxaaxx';
    arg2 = 'xxxxaaxxx';
    expected = {
      length    : 9,
      offset    : -1,
      isContain : false
    };
    expect(app.getContainStr(arg1, arg2)).eql(expected);
  });
});

describe('isArray', function() {
  before(function() {
    var arg1 = [],
      expected = false;
  });

  it('Array', function() {
    expected = true;

    arg1 = [];
    expect(app.isArray(arg1)).equal(expected);

    arg1 = [1, 2];
    expect(app.isArray(arg1)).equal(expected);

    arg1 = ['aa', 'bb'];
    expect(app.isArray(arg1)).equal(expected);
  });

  it('Not Array', function() {
    expected = false;

    // string
    arg1 = 'qwertyui';
    expect(app.isArray(arg1, arg2)).equal(expected);

    // number
    arg1 = 123;
    expect(app.isArray(arg1, arg2)).equal(expected);

    // object
    arg1 = {};
    expect(app.isArray(arg1, arg2)).equal(expected);
  });
});

describe('isString', function() {
  before(function() {
    var arg1 = [],
      expected = false;
  });

  it('String', function() {
    expected = true;

    arg1 = '12';
    expect(app.isString(arg1)).equal(expected);

    arg1 = 'aaaaa';
    expect(app.isString(arg1)).equal(expected);
  });

  it('Not String', function() {
    expected = false;

    // array
    arg1 = [];
    expect(app.isString(arg1, arg2)).equal(expected);

    // number
    arg1 = 123;
    expect(app.isString(arg1, arg2)).equal(expected);

    // object
    arg1 = {};
    expect(app.isString(arg1, arg2)).equal(expected);
  });
});

describe('Puzzle 1', function() {
  before(function() {
    var arg1 = [],
      arg2 = '',
      expected = '';
  });

  it('Invalid format', function() {
    // 15 possibility (16 - 1)
    // - string
    // - array
    // - number
    // - object
    var string = 'xxxxxxabxxxxx',
      number = 1,
      array = ['ab'],
      object = {},
      emptyString = '';

    // invalid type
    expect(app.puzzle1(string, string)).equal(emptyString);
    expect(app.puzzle1(string, array)).equal(emptyString);
    expect(app.puzzle1(string, number)).equal(emptyString);
    expect(app.puzzle1(string, object)).equal(emptyString);
    expect(app.puzzle1(array, string)).not.equal(emptyString); // valid
    expect(app.puzzle1(array, array)).equal(emptyString);
    expect(app.puzzle1(array, number)).equal(emptyString);
    expect(app.puzzle1(array, object)).equal(emptyString);
    expect(app.puzzle1(number, string)).equal(emptyString);
    expect(app.puzzle1(number, array)).equal(emptyString);
    expect(app.puzzle1(number, number)).equal(emptyString);
    expect(app.puzzle1(number, object)).equal(emptyString);
    expect(app.puzzle1(object, string)).equal(emptyString);
    expect(app.puzzle1(object, array)).equal(emptyString);
    expect(app.puzzle1(object, number)).equal(emptyString);
    expect(app.puzzle1(object, object)).equal(emptyString);

    // invalid number of arg1
    expect(app.puzzle1([], string)).equal(string);
    expect(app.puzzle1(['ab', 'ab', 'ab'], string)).equal(string);
    expect(app.puzzle1(['ab', 'ab', 'ab', 'ab'], string)).equal(string);
  });
  
  // case 1
  it('arg1.length = 1', function() {
    arg1 = ['ab'];
    arg2 = 'xxxxxxabxxxxx';
    expected = 'xxxxxx<strong>ab</strong>xxxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    arg1 = ['qaxg'];
    arg2 = 'aaaaaqaxgqqqqqq';
    expected = 'aaaaa<strong>qaxg</strong>qqqqqq';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  it('arg1.length = 2 (arg1[0] = arg1[1])', function() {
    arg1 = ['ab', 'ab'];
    arg2 = 'xxxxabxxxxabxxxx';
    expected = 'xxxxabxxxxabxxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  // case 2
  it('arg1.length = 2 (found both [each occurrence = 1] and not intersect)', function() {
    arg1 = ['ab', 'bc'];
    arg2 = 'xxxxxxabxxbcxxx';
    expected = 'xxxxxx<strong>ab</strong>xx<strong>bc</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    arg1 = ['ab11', '22bc'];
    arg2 = 'xxab11xxxx22bcxxx';
    expected = 'xx<strong>ab11</strong>xxxx<strong>22bc</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    // switch order
    arg1 = ['22bc', 'ab11'];
    arg2 = 'xxab11xxxx22bcxxx';
    expected = 'xx<strong>ab11</strong>xxxx<strong>22bc</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    // part of 'strong' (e.g. 'stro')
    arg1 = ['ab', 'stro'];
    arg2 = 'xxxxxxabxxstroxxx';
    expected = 'xxxxxx<strong>ab</strong>xx<strong>stro</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  // case 3, 4
  it('arg1.length = 2 (found both [each occurrence = 1] and intersect)', function() {
    arg1 = ['abbbbb', 'bbbbbc'];
    arg2 = 'xxxxxxabbbbbcxxx';
    expected = 'xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    // replace first occur
    arg1 = ['abbbbb', 'bbb'];
    arg2 = 'xxxxxxabbbbbcxxx';
    expected = 'xxxxxx<strong>a<strong>bbb</strong>bb</strong>cxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
    
    // switch
    arg1 = ['bbbbbc', 'abbbbb'];
    arg2 = 'xxxxxxabbbbbcxxx';
    expected = 'xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  it('arg1.length = 2 (found both [each occurrence >= 1]', function() {
    // no enough information
    // example test case
    // 
    // arg1 = ['ab', 'cd'];
    // arg2 = 'xxabxxabxxcdxx';
    // expected = 'xxabxxabxxcdxx';
    // expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  // case 5, 6
  it('arg1.length = 2 (not found both)', function() {
    arg1 = ['111', '2222'];
    arg2 = 'xxxxxxabbbbbcxxx';
    expected = 'xxxxxxabbbbbcxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    arg1 = ['abbb', '2222'];
    arg2 = 'xxxxxxabbbbbcxxx';
    expected = 'xxxxxxabbbbbcxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });
});
