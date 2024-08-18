class Tile{
    color
    constructor(color="#000"){
        this.color=color;
    }
    passable
}

class Grass extends Tile{
    constructor(color="#2dc416"){
        super(color);
        this.color=color;
        this.passable=true;
    }
}

class Wall extends Tile{
    color
    constructor(color="#525452"){
        super(color);
        this.color=color;
        this.passable=false;
    }
    passable
}