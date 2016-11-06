var chai = require('chai'),
  expect = chai.expect;

var app = require('../js/puzzle');

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
