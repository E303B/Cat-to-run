class MenuElement {
    x
    y
    width
    height
    onClick() {

    }
    tick() {

    }
    render() {

    }
    onHold() {

    }
    onHover() {

    }

    constructor(x = 0, y = 0, width = 1, height = 1, tick = () => { }, render = () => { }, onClick = () => { }, onHold = () => { }, onHover = () => { }) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.tick = tick;
        this.render = render;
        this.onClick = onClick;
        this.onHold = onHold;
        this.onHover = onHover;
    }
}


class Menu {
    elements
    constructor(elements = []) {
        this.elements = elements;
    }
    tick() {
        this.elements.forEach(element => {
            element.tick();
        });
        this.onHover(mouseX, mouseY);
        if (mousedown) {
            this.onHold(mouseX, mouseY);
            if (mouseclick) this.onClick(mouseX, mouseY);
        }
    }

    render() {
        this.elements.forEach(element => {
            element.render();
        });
    }


    onClick(x, y) {
        for (let element in this.elements) {
            if (Math.abs(this.elements[element].x - x) < this.elements[element].width / 2 && Math.abs(this.elements[element].y - y) < this.elements[element].height / 2) {
                this.elements[element].onClick();
            }
        }
    }
    onHold(x, y) {
        for (let element in this.elements) {
            if (Math.abs(this.elements[element].x - x) < this.elements[element].width / 2 && Math.abs(this.elements[element].y - y) < this.elements[element].height / 2) {
                this.elements[element].onHold();
            }
        }

    }
    onHover(x, y) {
        for (let element in this.elements) {
            if (Math.abs(this.elements[element].x - x) < this.elements[element].width / 2 && Math.abs(this.elements[element].y - y) < this.elements[element].height / 2) {
                this.elements[element].onHover();
            }
        }

    }
}