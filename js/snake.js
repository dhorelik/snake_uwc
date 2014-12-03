define(['food', 'field'], function(food, field) {

    return {

        initialize: function(cellSize, speed) {

            this
                .findBlocks()
                .reset(cellSize, speed);


            // original snake length is 5 cell
            for (var i = 0; i <= 4; i++) {
                this.drawCell(i, 0);
            }

            // on food initialization -1 adjusts possible position to fit all cases within the field
            food.initialize(field._widthLimit - 1, field._heightLimit - 1, cellSize);

            this.start();

        },

        findBlocks: function() {

            this.domElem = document.getElementById('snake');
            this.scoreContainer = document.getElementById('score');

            return this;

        },

        reset: function(cellSize, speed) {

            this._cellSize = cellSize;
            this._score = 0;
            this._stepInterval = speed;
            this._direction = 'right';  // on start the snake moves to the right
            this._isPaused = false;

            this.body = [];             // snake body is stored in the array with coordinates for every cell

            this.domElem.innerHTML = '';

        },

        /**
         * The game loop which makes the snake move
         * param {Number} t - smaller time means faster move
         */
        start: function() {

            var self = this;
console.log('go');
            this.loop = setInterval(function () {
                self.move();
            }, this._stepInterval);

        },

        stop: function() {
            clearInterval(this.loop);
            document.dispatchEvent(new Event('gameOver'));
        },

        drawCell: function(x, y) {

            var cell = document.createElement('div'),
                html = '<div class="cell"></div>';

            cell.innerHTML = html;
            cell = cell.firstChild;

            cell.style.top = y * this._cellSize + 'px';
            cell.style.left = x * this._cellSize + 'px';

            cell.style.width = this._cellSize + 'px';
            cell.style.height = this._cellSize + 'px';

            this.domElem.appendChild(cell);

            // need to update the array as well
            this.body.unshift({x: x, y: y});

            return this;

        },

        /**
         * Removes the tail cell from both dom and the coordinates array
         */
        cutTail: function() {
            this.domElem.removeChild(this.domElem.childNodes[0]);
            this.body.pop();
        },

        move: function() {

            var headX = this.body[0].x,
                headY = this.body[0].y;

            if (this._direction === "right") headX++;
            else if (this._direction === "left") headX--;
            else if (this._direction === "up") headY--;
            else if (this._direction === "down") headY++;

            this.checkCollision(headX, headY);

            // drawing new head
            this
                .drawCell(headX, headY)
                .cutTail();

        },

        checkCollision: function(x, y) {

            // border
            if (x < 0 || x >= field._widthLimit || y < 0 || y >= field._heightLimit) {
                this.stop();
            }

            // itself
            for (var i = 0, l = this.body.length; i < l; i++) {
                if (this.body[i].x === x && this.body[i].y === y) {
                    this.stop();
                }
            }

            // food
            if (x === food.x && y === food.y) {

                this
                    .elongate()
                    .setScore(++this._score);

                food.setPosition(this.body);

            }

        },

        /**
         * Changes the direction
         * @param {String} direction ['left', 'right', 'up', 'down']
         */
        turn: function(direction) {
            this._direction = direction;
        },

        /**
         * Adds new cell after food has been eaten
         */
        elongate: function() {

            this.drawCell(food.x, food.y);

            return this;

        },

        /**
         * Updates the score
         * @param {Number} score
         */
        setScore: function(score) {
            //todo поинтереснее
            this.scoreContainer.innerHTML = score;
        },

        togglePause: function() {

            this._isPaused
                ? this.start()
                : clearInterval(this.loop);

            this._isPaused = !this._isPaused;

        }

    }

});
