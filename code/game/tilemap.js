class TileMap {
    tileMap
    width
    height
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.tileMap = [];
        this.tileMap[0] = [];
        for (let y = 0; y < height; y++)this.tileMap[0][y] = new Wall();
        for (let x = 1; x < width - 1; x++) {
            this.tileMap[x] = [];
            this.tileMap[x][0] = new Wall;
            for (let y = 1; y < height - 1; y++)this.tileMap[x][y] = new Grass();
            this.tileMap[x][height - 1] = new Wall;
        }
        this.tileMap[width - 1] = [];
        for (let y = 0; y < height; y++)this.tileMap[width - 1][y] = new Wall();
    }
    getTile(x, y) {
        x = Math.round(x);
        y = Math.round(y);
        if ((x < 0 || x > this.width - 1) || (y < 0 || y > this.height - 1)) return null;
        return this.tileMap[x][y]
    }
}