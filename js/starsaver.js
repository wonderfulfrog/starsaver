var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'starsaver', {create: create, update: update, render: render });

var stars;

function create() {

    stars = [];

    var star = {
        origin: { x: 0, y: 0 },
        start: { x: 100, y: 150 },
        curr: { x: 100, y: 150 },
        size: 2,
        speed: 0.2,
        slope: (100 - 0) / (150 - 0)
    }
    stars.push(star);

}

function update() {
    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        var slope = star.slope;
        var newX = star.curr.x + star.speed;
        var newY = (slope * ( newX - star.start.x )) + star.start.y;
        star.curr.x = newX;
        star.curr.y = newY;
    }
}

function render() {

    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        game.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
        game.context.fillRect(star.curr.x, star.curr.y, star.size, star.size);
    }

}