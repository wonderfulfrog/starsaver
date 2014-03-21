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
        star.speed = star.speed + Math.random();
    }

    addNewStars();

}

function render() {

    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        game.context.fillStyle = 'rgba('+ star.color.red + ', ' + star.color.green + ', ' + star.color.blue + ', ' + star.brightness + ')';
        game.context.fillRect(star.curr.x, star.curr.y, star.size, star.size);
    }

}

function addNewStars() {
    for(var i = 0; i < 1; i++) {
        var devX = ((Math.random()*50)+1 ) * Math.cos( Math.PI * Math.round( Math.random() ));
        var devY = ((Math.random()*50)+1 ) * Math.cos( Math.PI * Math.round( Math.random() ));
        var x = originX + devX;
        var y = originY + devY;
        var star = {
            origin: { x: originX, y: originY },
            curr: { x: x, y: y },
            size: 2,
            speed: 1.2,
            slope: (x - originX) / (y - originY),
            brightness: Math.random(),
            color: {}
        }
        var rand = (Math.random()*10)+1;
        if(rand > 9.5)
            color = { 'red': 255, 'green': 170, 'blue': 170 };
        else if(rand > 9)
            color = { 'red': 170, 'green': 170, 'blue': 255 };
        else if(rand > 8.7)
            color = { 'red': 255, 'green': 255, 'blue': 153 };
        else
            color = { 'red': 255, 'green': 255, 'blue': 255 };

        star.color = color;
        stars.push(star);
    }
}