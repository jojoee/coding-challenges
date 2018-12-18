# Coding challenges
[![Build Status](https://travis-ci.org/jojoee/coding-challenges.svg)](https://travis-ci.org/jojoee/coding-challenges) [![Greenkeeper badge](https://badges.greenkeeper.io/jojoee/coding-challenges.svg)](https://greenkeeper.io/)

For practicing coding challenge

![Screenshot](https://raw.githubusercontent.com/jojoee/coding-challenges/master/screenshot/screenshot1.jpg "Screenshot")

## Getting Started
1. Install [Node.js](https://nodejs.org/en/)
2. Set path (e.g. `cd C:\xampp\htdocs\jojoee.com\coding-challenges`)
3. Install global: `npm install -g gulp`
4. Install dependencies: `npm install`
5. Start: `npm run test.watch` (to develop)

## Note
- Code style: [Airbnb](https://github.com/airbnb/javascript)

## TODO
- [ ] Refactor `Puzzle 1` into smaller functions and improve logic
- [ ] Separate module
- [ ] Implement [Shields.io](http://shields.io/)
- [ ] Implement [JSHint](http://jshint.com/)
- [ ] Implement [JSCS](http://jscs.info/)

## Puzzle
Find f(x1[, x2[, ...[, xn]]])

### Puzzle 1
```
    x1                      x2                    f(x1, x2)

1 | ["ab"]                | "xxxxxxabxxxxx"     | "xxxxxx<strong>ab</strong>xxxxx"
2 | ["ab", "bc"]          | "xxxxxxabxxbcxxx"   | "xxxxxx<strong>ab</strong>xx<strong>bc</strong>xxx"
3 | ["abbbbb", "bbbbbc"]  | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx"
4 | ["abbbbb", "bbb"]     | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbb</strong>bb</strong>cxxx"
5 | ["111", "2222"]       | "xxxxxxabbbbbcxxx"  | "xxxxxxabbbbbcxxx"
6 | ["abbb", "2222"]      | "xxxxxxabbbbbcxxx"  | "xxxxxxabbbbbcxxx"
```
