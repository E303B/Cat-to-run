class Entity {
    x
    y
    direction
    constructor(x = 0, y = 0, direction = 0) {
        this.x = x;
        this.y = y;
        this.direction = direction;
    }
    moveInDirection(direction, force) {
        return this.tryMove(Math.sin(direction) * force / runner.tps, -Math.cos(direction) * force / runner.tps);
    }
    tick() { }

    render() {

    }

    collides() {
        return (!runner.engine.tileMap.getTile(this.x, this.y).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y).passable) || (!runner.engine.tileMap.getTile(this.x, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x + 0.5, this.y - 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y + 0.5).passable) || (!runner.engine.tileMap.getTile(this.x - 0.5, this.y - 0.5).passable)
    }

    tryMove(dx, dy) {
        let touchedWall = false;
        const steps = 10;
        for (let step = 0; step < steps; step++) {
            this.x += dx / steps;
            if (this.collides()) {
                this.x -= dx / steps;
                touchedWall = true;
            }
            this.y += dy / steps;
            if (this.collides()) {
                touchedWall = true;
                this.y -= dy / steps;
            }
        }
        return touchedWall;
    }
}

class TailPolygon {
    direction
    constructor() {
        this.direction = 0;
    }
}

class Player extends Entity {
    coinsCollected
    image
    speed


    tail
    tailLength
    tailPolygonCount
    tailDirection
    //false=left true=right
    tailColor
    tailRange
    tailTick
    tailMobility

    constructor(x = 0, y = 0, direction = 0) {
        super(x, y, direction);
        this.coinsCollected = 0;
        this.image = new Image(1, 1);
        this.image.src = "./img/catsInGame/Base.png";
        this.speed = 5;
        this.tailLength = 0.5;
        this.tailPolygonCount = 50;
        this.tail = [];
        for (let i = 0; i < this.tailPolygonCount; i++) {
            this.tail.push(new TailPolygon(this.tailLength / this.tailPolygonCount * i));
        }
        this.tailDirection = randBool();
        this.tailColor = "#000";
        this.tailRange = 4;
        this.tailTick = 0;
        this.tailMobility=0.7;
    }
    animateTail(speed) {
        for (let tailPolygon in this.tail) {
            this.tail[tailPolygon].direction += degreesToRadians(speed*Math.pow(tailPolygon, this.tailMobility) / runner.tps * (this.tailDirection ? 1 : -1));
        };
        this.tailTick += 1 / runner.tps;
        if (this.tailTick > this.tailRange / speed) {
            this.tailTick = -this.tailRange / speed;
            this.tailDirection = !this.tailDirection;
        }
    }
    tick() {
        if (keysPressed.includes("w") || keysPressed.includes("W")) this.tryMove(0, -this.speed / runner.tps);
        if (keysPressed.includes("s") || keysPressed.includes("S")) this.tryMove(0, this.speed / runner.tps);
        if (keysPressed.includes("a") || keysPressed.includes("A")) this.tryMove(-this.speed / runner.tps, 0);
        if (keysPressed.includes("d") || keysPressed.includes("D")) this.tryMove(this.speed / runner.tps, 0);
        runner.engine.camX = this.x;
        runner.engine.camY = this.y;
        for (let entity in runner.engine.entities) if (runner.engine.entities[entity] instanceof Saw && distanse(this.x, this.y, runner.engine.entities[entity].x, runner.engine.entities[entity].y) < 1) this.collideWithSaw(runner.engine.entities[entity]);
        this.direction = getDir((this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, mouseX, mouseY);
        this.animateTail(15);
    }
    collideWithSaw(saw) {
        runner.engine.toDelete.push(this, saw);
    }
    getPreviousPolygonDirection(i) {
        return i > 0 ? this.tail[i - 1].direction : 0;
    }
    render() {
        drawRotated(this.image, (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, this.direction, runner.engine.tileSize);
        let x = this.x - Math.sin(degreesToRadians(this.direction + 90)) / 2;
        let y = this.y + Math.cos(degreesToRadians(this.direction + 90)) / 2;
        for (let tailPolygon in this.tail) {
            x -= Math.sin(this.tail[tailPolygon].direction + this.getPreviousPolygonDirection(tailPolygon) + degreesToRadians(this.direction + 90)) * this.tailLength / this.tailPolygonCount;
            y += Math.cos(this.tail[tailPolygon].direction + this.getPreviousPolygonDirection(tailPolygon) + degreesToRadians(this.direction + 90)) * this.tailLength / this.tailPolygonCount;
            drawCircle(this.tailColor, (x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, this.tailLength / this.tailPolygonCount * runner.engine.tileSize * 5)
        }
    }
}

class Saw extends Entity {
    tick() {
        if (this.moveInDirection(this.direction, runner.engine.difficulty)) runner.engine.toDelete.push(this);
    }
    render() {
        drawCircle("#474747", (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, runner.engine.tileSize / 2);
    }
}

class Coin extends Entity {
    tick() {
        for (let entity in runner.engine.entities) if (runner.engine.entities[entity] instanceof Player && distanse(this.x, this.y, runner.engine.entities[entity].x, runner.engine.entities[entity].y) < 0.75) this.giveCoins(runner.engine.entities[entity]);
    }

    giveCoins(player) {
        player.coinsCollected++;
        runner.engine.toDelete.push(this);
        runner.engine.coinsCollected++;
    }
    render() {
        drawCircle("#fbff00", (this.x - runner.engine.camX) * runner.engine.tileSize + canvas.width / 2, (this.y - runner.engine.camY) * runner.engine.tileSize + canvas.height / 2, runner.engine.tileSize / 4);
    }
}