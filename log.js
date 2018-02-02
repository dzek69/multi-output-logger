const COLOR_RED = "\x1b[31m";
const COLOR_GREEN = "\x1b[32m";
const COLOR_YELLOW = "\x1b[33m";
const COLOR_BLUE = "\x1b[34m";
const COLOR_MAGENTA = "\x1b[35m";
const COLOR_CYAN = "\x1b[36m";
const COLOR_RESET = "\x1b[0m";

const colorsMap = [
    COLOR_GREEN, COLOR_YELLOW, COLOR_BLUE, COLOR_MAGENTA, COLOR_CYAN,
];
const colorsCount = colorsMap.length;

const time = () => (new Date()).toLocaleString("pl-PL").split(" ")[1];

const base = (count, number) => {
    while (number >= count) {
        number -= count;
    }
    return number;
};

const trim = (val) => {
    if (typeof val === "string") {
        return val.trim();
    }
    return val;
};

const log = function(color, name, isError, ... args) {
    let useColor = color;
    if (typeof useColor === "number") {
        useColor = colorsMap[base(colorsCount, useColor)];
    }
    const logFn = console[isError ? "error" : "log"];
    logFn(useColor, ">", name + (isError ? COLOR_RED : COLOR_RESET), "", time(), "", ...args.map(trim));
};
log.COLOR_RED = COLOR_RED;
log.COLOR_GREEN = COLOR_GREEN;
log.COLOR_YELLOW = COLOR_YELLOW;
log.COLOR_BLUE = COLOR_BLUE;
log.COLOR_MAGENTA = COLOR_MAGENTA;
log.COLOR_CYAN = COLOR_CYAN;

module.exports = log;
