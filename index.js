"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const regexp_cjk_1 = require("regexp-cjk");
__export(require("./table"));
const table_1 = require("./table");
exports.SP_KEY = '#_@_#';
exports.SP_REGEXP = '(?:\@|（·?）|\-|\/|\\\(\\\)|%|￥|_|\\\?|？|\\\||#|\\\$|[（\\\(](?:和谐|河蟹)[\\\)）]|（河）（蟹）|[（\\(][河蟹]{1,2}[\\)）]| |\\\.|[・。·]|\\*|□|圌)';
exports.SP_ESCAPE = '（河蟹）';
function escape(text, options = {}) {
    let flags = typeof options.flags == 'string' ? options.flags : 'ig';
    let t = (options.tables || [])
        .concat(table_1.table2)
        .concat(table_1.table3)
        .reduce(function (a, b) {
        if (Array.isArray(b)) {
            a = a.concat(b);
        }
        else {
            a.push(b);
        }
        return a;
    }, [])
        .concat(table_1.table);
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    do {
        t.forEach(function (value, index, array) {
            let a = new Array(value.split('').length).fill(0).map(function (value, index, array) {
                return '$' + (index + 1);
            });
            let r = a.join(exports.SP_ESCAPE);
            let s = fn('(' + value.split('').join(')(') + ')', flags);
            text = text.replace(s, r);
        });
    } while (--count > 0);
    return text;
}
exports.escape = escape;
function unescape(text, options = {}) {
    let flags = typeof options.flags == 'string' ? options.flags : 'ig';
    let t = (options.tables || [])
        .concat(table_1.table2)
        .concat(table_1.table3)
        .reduce(function (a, b) {
        if (Array.isArray(b)) {
            a = a.concat(b);
        }
        else {
            a.push(b);
        }
        return a;
    }, [])
        .concat(table_1.table);
    let count = options.count || 1;
    const fn = options.toRegExp ? options.toRegExp : regexp_cjk_1.create;
    t.forEach(function (value, index, array) {
        let rs = fn('(' + value.split('').join(')' + exports.SP_KEY + '(') + ')', flags);
        let s = new RegExp(rs.source.split(exports.SP_KEY).join(exports.SP_REGEXP), flags);
        let a = new Array(value.split('').length).fill(0).map(function (value, index, array) {
            return '$' + (index + 1);
        });
        let r = a.join('');
        text = text.replace(s, r);
    });
    return text;
}
exports.unescape = unescape;
function getTable(options = {}) {
    let flags = typeof options.flags == 'string' ? options.flags : 'ig';
    return (options.tables || [])
        .concat(table_1.table2)
        .concat(table_1.table3)
        .concat(table_1.table)
        .reduce(function (a, b) {
        let c;
        c = Array.isArray(b) ? b : [b];
        c.forEach(function (value, index, array) {
            let rs;
            let s = value.split('');
            let r;
            if (c.length == 1 && options.followReturn) {
                r = new Array(s.length)
                    .fill(0)
                    .map(function (value, index, array) {
                    return '$' + (index + 1);
                }).join('');
            }
            else {
                r = c[0];
            }
            rs = [s.join(exports.SP_KEY), r, flags];
            a.push(rs);
        });
        return a;
    }, []);
}
exports.getTable = getTable;
const self = require("./index");
exports.default = self;