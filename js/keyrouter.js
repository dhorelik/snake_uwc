define(['snake'], function(snake) {

    return {

        bindKeys: function (e) {

            var keyCode = e.keyCode,
                direction = snake._direction;

            switch (keyCode) {
                case 37:
                    if (direction !== 'right') direction = 'left';
                    break;
                case 38:
                    if (direction !== 'down') direction = 'up';
                    break;
                case 39:
                    if (direction !== 'left') direction = 'right';
                    break;
                case 40:
                    if (direction !== 'up') direction = 'down';
                    break;
                case 32:
                    snake.togglePause();
                    break;
                default:
                    return;
            }

            snake.turn(direction);

        }

    }

});
