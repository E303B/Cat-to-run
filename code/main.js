class Runner {
    tps
    engine
    constructor(tps) {
        this.tps = tps;
        this.restart();
    }
    tick() {
        this.engine.tick();
        inGameMenu.tick();
    }
    render(){
        fillBackground("#000");
        this.engine.render();
        inGameMenu.render();
    }
    restart(){
        this.engine = new GameEngine(15);
    }
}


function tick(){
    runner.tick();
    runner.render();
}

const tps = 60;
let runner = new Runner(tps);
setInterval(tick, 1000 / tps);