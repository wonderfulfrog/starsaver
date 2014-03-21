var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var originX = WIDTH / 2;
var originY = HEIGHT / 2;

var game = new Phaser.Game(WIDTH, HEIGHT, Phaser.CANVAS, 'starsaver', {create: create, update: update, render: render });

var stars;

function create() {

    stars = [];

    addNewStars();

}

function update() {

    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        var tx = star.origin.x - star.curr.x;
        var ty = star.origin.y - star.curr.y;
        var dist = Math.sqrt(tx*tx+ty*ty);
        var rad = Math.atan2(ty,tx);
        var angle = rad / Math.PI * 180;
        var deltaX = (tx / dist) * star.speed;
        var deltaY = (ty / dist) * star.speed;
        star.curr.x = star.curr.x - deltaX;
        star.curr.y = star.curr.y - deltaY;
    }

    addNewStars();

}

function render() {

    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        game.context.fillStyle = 'rgba(255, 255, 255, 1.0)';
        game.context.fillRect(star.curr.x, star.curr.y, star.size, star.size);
    }

}

function addNewStars() {
    for(var i = 0; i < 100; i++) {
        var devX = ((Math.random()*20)+1 ) * Math.cos( Math.PI * Math.round( Math.random() ));
        var devY = ((Math.random()*20)+1 ) * Math.cos( Math.PI * Math.round( Math.random() ));
        var x = originX + devX;
        var y = originY + devY;
        var star = {
            origin: { x: originX, y: originY },
            curr: { x: x, y: y },
            size: 2,
            speed: 5,
            slope: (x - originX) / (y - originY)
        }
        stars.push(star);
    }
}