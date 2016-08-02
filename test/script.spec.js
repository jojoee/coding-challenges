var chai = require('chai'),
  expect = chai.expect;

var app = require('../js/script.js');

describe('Puzzle1', function() {
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
    expect(app.puzzle1([], string)).equal(emptyString);
    expect(app.puzzle1(['ab', 'ab', 'ab'], string)).equal(emptyString);
    expect(app.puzzle1(['ab', 'ab', 'ab', 'ab'], string)).equal(emptyString);
  });

  it('Basic find - 1 word', function() {
    arg1 = ['ab'];
    arg2 = 'xxxxxxabxxxxx';
    expected = 'xxxxxx<strong>ab</strong>xxxxx';
    expect(app.puzzle1(arg1, arg2)).equal(expected);

    arg1 = ['qaxg'];
    arg2 = 'aaaaaqaxgqqqqqq';
    expected = 'aaaaa<strong>qaxg</strong>qqqqqq';
    expect(app.puzzle1(arg1, arg2)).equal(expected);
  });

  it('Basic find - 2 word (not intersect)', function() {

  });
});
