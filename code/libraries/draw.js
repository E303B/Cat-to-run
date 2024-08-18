const drawRect = function (color, x, y, width, height) {
    ctx.beginPath()
    ctx.rect(x, y, width, height)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

const drawSquare = function (color, x, y, size) {
    drawRect(color, x, y, size, size)
}

const fillBackground = function (color) {
    drawRect(color, 0, 0, canvas.width, canvas.height)
}

const drawCircle = function (color, x, y, radius) {
    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

const drawRotated = function (image, x, y, degrees, size) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(degrees * Math.PI / 180);
    ctx.drawImage(image, -(image.width * size) / 2, -(image.height * size) / 2, size, size);
    ctx.restore();
}

const drawText = function (text, color, x, y, font, size) {
    ctx.font = size + "px " + font;
    ctx.fillStyle = color;
    ctx.fillText(text, x - (text.length / 4 * size), y - (size / 2));
}