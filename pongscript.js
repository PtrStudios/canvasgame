        var canvas = document.getElementById("canvas");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
     
        var ctx = canvas.getContext("2d");
       
        var requestAnimationFrame = window.requestAnimationFrame ||
                                    window.webkitRequestAnimationFrame ||
                                    window.mozRequestAnimationFrame ||
                                    window.msRequestAnimationFrame ||
                                    window.oRequestAnimationFrame;
                                    
        function full() {
            canvas.webkitRequestFullScreen() ||
                   requestFullScreen() ||
                   mozRequestFullScreen() ||
                   msRequestFullScreen() ||
                   oRequestFullScreen();
        }
        var mouseX;
        var balls = [];
    	var total = 0;
		var lose = false;
		var numHit = 0;
		var time = 0;
		var score1 = 0;
		var score2 = 0;
        var pcolor = "rgb(255,255,255)";
        var paddle = {
            x : 0,
            y : canvas.height / 1.1,
            width : 300,
            height : 10,
            draw : function() {
                ctx.fillStyle = pcolor;
                ctx.fillRect(this.x,this.y,this.width,this.height);
            }
        }

        $("canvas").mousemove(function(e) {
            paddle.x = e.clientX - this.getBoundingClientRect().left;
        });

		function random(min, max) {
            return Math.floor(Math.random() * (max - min) + min);
        }

        function Ball(x,y,down,speed,vx) {
            this.x = x;
            this.y = y;
            this.down = down;
            this.speed = speed;
            this.vx = vx;
			var hasHit = false;
			var color = "rgb(" + random(0,255) + "," + random(0,255) + "," + random(0,255) + ")";
            this.draw = function() {
                ctx.fillStyle = color;
                ctx.beginPath();
                ctx.arc(x,y,10,0,Math.PI * 2);
                ctx.fill();
            }
            this.move = function() {
                x += vx;   
                
                if (down) {
                    y += speed;

                }

                if (!down) {
                    y -= speed;

                }

                if (x > paddle.x && x < paddle.x + paddle.width && y > paddle.y && y < paddle.y + paddle.height) {
                    down = false;
                    if (x < (paddle.x + paddle.width * 0.5)) {
                        vx = random(-10,-1);
                    }

                    else {
                        vx = random(1,10);
                    }
                    
                    pcolor = color;
					
					if (!hasHit) {
						numHit++;
					}
					
					hasHit = true;
					
                } 

                if (x < 0) {
                    vx = random(1,10);    
                }

                if (x > canvas.width) {
                    vx = random(-10,-1); 
                }

                if (y <= 0) {
                    down = true;
                }
				if (y > canvas.height) {
					lose = true;
				}
            }

        }
		
        balls[total] = new Ball(50,50,true,5,0);
        total++;
		
		var bInterval = setInterval(function(){
				balls[total] = new Ball(50,50,true,5,0);
				total++;
		},5000);
		
        function update() {
            ctx.clearRect(0,0,canvas.width,canvas.height);
            paddle.draw();
            if (!lose) {
				for (var i = 0; i < balls.length; i++) {
					balls[i].draw();
					balls[i].move();
				}
				time++;
			}
			if (lose) {
				ctx.font = "50px Arial";
				ctx.fillStyle = "white";
				ctx.textAlign = "center";
				ctx.fillText("YOU LOSE",canvas.width / 2,canvas.height / 2);
				ctx.font = "25px Verdana";
				ctx.fillText("Balls hit : " + numHit,canvas.width / 2,canvas.height / 2 + 200);
				ctx.fillText("Time : " + time,canvas.width / 2,canvas.height / 2 + 250);
				score1 = (time + time * 0.75) + (numHit * 1000);
				if (score2 < score1) {
					score2 += 5;
				}
				ctx.fillText("Score : " + score2, canvas.width / 2, canvas.height / 2 + 300);
				clearInterval(bInterval);
			}
            requestAnimationFrame(update);
        }
        update();