$(document).ready(function() {
	
	field = $('#field');	
	snake = $('#snake');
	points = 0;
	speedTimer = 100;

	// figure out original position
	var initialPosition = snake.position();
	var topPosition = initialPosition.top;
	var leftPosition = initialPosition.left;
	
	// initial move direction
	directionX = 'right';
	directionY = 'none';
		
	// first move and first food
	setNewDot();
	goSnake();

	
		// main function
		function goSnake() {

			//tail blocks positioning  
			if (points >= 2){
				tailNextBlockInitialPosition = $('#1').position();
				
				$('.tail').each(function() {

					tailBlockInitialPosition = tailNextBlockInitialPosition;
					var tailBlockTopPosition = tailBlockInitialPosition.top;
					var tailBlockLeftPosition = tailBlockInitialPosition.left;

					tailNextBlockInitialPosition = $(this).next().position();
					
					//	console.log(tailBlockLeftPosition);
						
					$(this).next().css({
						left: tailBlockLeftPosition,
						top: tailBlockTopPosition
					}).show();
					
				});
			}
			
			// first tail block positioning
			$('#1').animate({
				left: leftPosition,
				top: topPosition
			}, 0).show();
			
   
			// figure out next position
			if (directionX == 'right'){
				leftPosition = leftPosition + 8;
			} else if (directionX == 'left'){
				leftPosition = leftPosition - 8;		
			} else {
				leftPosition = leftPosition;
			}

			if (directionY == 'top'){
				topPosition = topPosition - 8;
			} else if (directionY == 'bottom') {
				topPosition = topPosition + 8;		
			} else {
				topPosition = topPosition;
			}


			// snake movement 
			snake.animate({
				left: leftPosition,
				top: topPosition
			}, 0, function() {
			
				// check out the last move result
				// snake leaves the field
				if (leftPosition >= field.width() - 8){
					leftPosition = 0;
				}
				if (leftPosition <= -1){
					leftPosition = field.width() - 8;
				}			
				if (topPosition >= field.height() - 8){
					topPosition = 0;
				}
				if (topPosition <= -1){
					topPosition = field.height() - 8;
				}			
				
				// snake hits the dot
				var target = $('.dot').position();
				var targetPositionY = target.top;
				var targetPositionX = target.left;			
				
				if ( topPosition >= targetPositionY - 4 && topPosition <= targetPositionY + 4){		// '4' is the hit tolerance, hitting section of the dot is ok, users can't be pixel-perfect =)
					if ( leftPosition >= targetPositionX - 4 && leftPosition <= targetPositionX + 4){
						$('.dot').remove();
						points++;
						$('#score').html(points);
						setNewDot();
						speedUp();
						
						// make snake longer
						field.append('<div class="tail" id="'+ points +'"></div>');
					}				
				}
				
				//check for game over
				$('.tail').each(function() {
					tailBlockEventualPosition = $(this).position();
					var tailBlockEventualTopPosition = tailBlockEventualPosition.top;
					var tailBlockEventualLeftPosition = tailBlockEventualPosition.left;
					
					if ( topPosition >= tailBlockEventualTopPosition - 4 && topPosition <= tailBlockEventualTopPosition + 4){		// '4' is the hit tolerance, hitting section of the dot is ok, users can't be pixel-perfect =)
						if ( leftPosition >= tailBlockEventualLeftPosition - 4 && leftPosition <= tailBlockEventualLeftPosition + 4){
							alert('thats a game over we are looking at, nice try though getting those ' + points + ' points');
							field.clear().html('<div id="snake"></div>');
						}				
					}

				});
				
				window.setTimeout( goSnake, speedTimer);
				
			});
		}
			  
	
	
	// create new food
	function setNewDot() {
		
		var minX = 0;
		var maxX = field.width() - 8; // dot dimensions are 8x8
		var minY = 0;
		var maxY = field.height() - 8;
		
		dotPositionX = Math.floor(Math.random() * (maxX - minX + 1)) + minX;
		dotPositionY = Math.floor(Math.random() * (maxY - minY + 1)) + minY;
		
		field.prepend('<div class="dot"></div>');
		
		$('.dot').css({
		   left : dotPositionX,
		   top : dotPositionY
		});
	}
	
	// speed the snake up every 4 hits
	function speedUp() {
		if (speedTimer > 10){
			if (points % 4 == 0){
				speedTimer = speedTimer - 20;
			}
		}
	}
	
	// set movement direction
	$(document).keydown(function(e){
		if (e.keyCode == 37 && directionX != 'right') { 
			directionX = 'left';
			directionY = 'none';
			return false;
		}
		if (e.keyCode == 38 && directionY != 'bottom') { 
			directionY = 'top';
			directionX = 'none';
			return false;
		}
		if (e.keyCode == 39 && directionX != 'left') { 
			directionX = 'right';
			directionY = 'none';
			return false;
		}
		if (e.keyCode == 40 && directionY != 'top') { 
			directionY = 'bottom';
			directionX = 'none';
			return false;
		}		
	});	
	
});