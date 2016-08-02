# Gulp Starter

## Getting Started
1. Install `Node.js`
2. Set path (e.g. `cd C:\xampp\htdocs\jojoee.com\coding-challenges`)
3. Install global: `npm install -g bower gulp`
4. Install dependencies: `bower install && npm install`
5. Start: `npm run test.watch` (to develop)

## TODO
1. Refactor `Puzzle 1` into smaller functions and improve logic

## Puzzle
Find f(x1[, x2[, ...[, xn]]])

### Puzzle 1
```
    arg1                    arg2                  f(x, y)

1 | ["ab"]                | "xxxxxxabxxxxx"     | "xxxxxx<strong>ab</strong>xxxxx"
2 | ["ab", "bc"]          | "xxxxxxabxxbcxxx"   | "xxxxxx<strong>ab</strong>xx<strong>bc</strong>xxx"
3 | ["abbbbb", "bbbbbc"]  | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbbbb</strong>c</strong>xxx"
4 | ["abbbbb", "bbb"]     | "xxxxxxabbbbbcxxx"  | "xxxxxx<strong>a<strong>bbb</strong>bb</strong>cxxx"
5 | ["111", "2222"]       | "xxxxxxabbbbbcxxx"  | "xxxxxxabbbbbcxxx"
6 | ["abbb", "2222"]      | "xxxxxxabbbbbcxxx"  | "xxxxxxabbbbbcxxx"
```
