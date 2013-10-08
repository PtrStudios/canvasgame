        var canvas = document.getElementById("canvas");
        var ctx = canvas.getContext("2d");
        var requestAnimationFrame = window.requestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    window.oRequestAnimationFrame;

        // This detects key presses.
        var keys = [];
        window.addEventListener("keydown", function (e) {
            keys[e.keyCode] = true;
        }, true);
        window.addEventListener("keyup", function (e) {
            keys[e.keyCode] = false;
        }, true);

        // This enemy array will track number of enemies.
        var enemies = [];
        // This is for use with the for loop.
        var totalEnemies = 0;

        // Same thing, but for bosses.
        var bosses = [];
        var totalBosses = 0;

        var won = false;

        // Player object
        var player = {
            x: 50,
            y: 50,
            velX: 0,
            velY: 0,
            width: 50,
            height: 50
        }

        //Enemy function constructor
        function Enemy(x, y, width, height, down, speed, color) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.down = down;
            this.speed = speed;
            this.color = color;
            this.col = function () {
                if (player.x + player.width >= this.x && player.x <= this.x + this.width && player.y + player.height >= this.y && player.y <= this.y + this.height) {
                    return true;
                }
                else { return false; }
            }
            this.draw = function () {
                ctx.fillStyle = color;
                ctx.fillRect(this.x, this.y, this.width, this.height);
            }
            this.move = function () {
                this.y += 5;
            }
        }

        // Function generates random coordinates for enemies.
        function random(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        // This function spawns enemies with random coordinates with random colors in the array enemies[].
        function spawnEnemies(n) {
            for (var i = 0; i < n; i++) {
                enemies[totalEnemies] = new Enemy(random(100, 450), random(-500, -50), 50, 50, true, 5, "rgb(" + random(0, 255) + "," + random(0, 255) + "," + random(0, 255) + ")");
                totalEnemies++;
            }
        }

        // Same exact thing, except for "bosses".
        function spawnBosses(n) {
            for (var i = 0; i < n; i++) {
                bosses[totalBosses] = new Enemy(random(200, 400), random(-800, -300), 200, 200, true, 2, "red");
                totalBosses++;
            }

        }

        // Checks if the player's x-coordinate is past the canvas.
        function checkWin() {
            if (player.x > canvas.width - player.width) {
                return true;
            }
            else {
                return false;
            }
        }

        // Spawn initial enemies.
        spawnEnemies(5);

        // Spawn 5 enemies every 2 seconds.
        setInterval(function () {
            spawnEnemies(5);
        }, 2000);

        // Spawn a boss every 10 seconds.
        setInterval(function () {
            spawnBosses(1);
        }, 10000);

        // This code updates the game.
        function update() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (keys[39] && player.velX < 3) {
                player.velX = 0;
                player.velX += 5;
            }
            if (keys[37] && player.velX < 3) {
                player.velX = 0;
                player.velX -= 5;
            }
            if (keys[38] && player.velX < 3) {
                player.velY = 0;
                player.velY -= 5;
            }
            if (keys[40] && player.velX < 3) {
                player.velY = 0;
                player.velY += 5;
            }
            player.velX *= 0.9;
            player.velY *= 0.9;
            ctx.fillStyle = "white";
            if (!checkWin()) {
                player.x += player.velX;
                player.y += player.velY;
            }
            if (checkWin()) {
                $("p").html("YOU WIN");
                win = true;
                enemies.splice(0, totalEnemies);
                bosses.splice(0, totalBosses);
            }
            ctx.fillRect(player.x, player.y, player.width, player.height);
            ctx.fillStyle = "red";
            for (var i = 0; i < enemies.length; i++) {
                if (!enemies[i].col()) {
                    enemies[i].draw();
                    enemies[i].move();
                }
                else {
                    $("p").html("YOU LOSE");
                    enemies.splice(0, totalEnemies);
                    bosses.splice(0, totalBosses);
                }
            }
            for (var i = 0; i < bosses.length; i++) {
                bosses[i].draw();
                if (!bosses[i].col()) {
                    bosses[i].move();
                }
                else {
                    $("p").html("YOU LOSE");
                    enemies.splice(0, totalEnemies);
                    bosses.splice(0, totalBosses);
                }
            }
            requestAnimationFrame(update);
        }
        update();