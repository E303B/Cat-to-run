function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randNum(min, max) {
    return Math.random() * (max - min + 1) + min;
}

function randBool() {
    return Math.random() >= 0.5;
}