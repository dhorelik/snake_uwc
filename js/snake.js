define(['food', 'field'], function(food, field) {

    return {

        _score: 0,

        // the snake moves to the right on start
        _direction: 'right',

        initialize: function (cellSize) {

            this._cellSize = 20;

            this.findBlocks();

            // snake body is stored in the array with coordinates for every cell
            this.body = [];

            // original snake length is 5 cell
            for (var i = 0; i <= 4; i++) {
                this.drawCell(i, 0);
            }

            // on food initialization -1 adjusts possible position to fit all cases within the field
            food.initialize(field._widthLimit - 1, field._heightLimit - 1, cellSize);

            this.start(100);

        },

        /**
         * The game loop which makes the snake move
         *
         * param {Number} t - smaller time means faster move
         */
        start: function (t) {

            var self = this;

            this.loop = setInterval(function () {
                self.move();
            }, t);

        },

        stop: function () {
            clearInterval(this.loop);
        },

        findBlocks: function () {

            this.domElem = document.getElementById('snake');
            this.scoreContainer = document.getElementById('score');

        },

        drawCell: function (x, y) {

            var cell = document.createElement('div'),
                html = '<div class="cell"></div>';

            cell.innerHTML = html;
            cell = cell.firstChild;

            cell.style.top = y * this._cellSize + 'px';
            cell.style.left = x * this._cellSize + 'px';

            this.domElem.appendChild(cell);

            // need to update the array as well
            this.body.unshift({x: x, y: y});

            return this;

        },

        /**
         * Removes the tail cell from both dom and the coordinates array
         */
        cutTail: function () {
            this.domElem.removeChild(this.domElem.childNodes[0]);
            this.body.pop();
        },

        move: function () {

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

        checkCollision: function (x, y) {

            // border
            if (x < 0 || x >= field._widthLimit || y < 0 || y >= field._heightLimit) {
                console.log('game over');
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
                this.elongate();
                food.set();
                this.setScore(++this._score);
            }

        },

        /**
         * Changes the direction
         * @param {String} direction ['left', 'right', 'up', 'down']
         */
        turn: function (direction) {
            this._direction = direction;
        },

        /**
         * Adds new cell after food has been eaten
         */
        elongate: function () {
            this.drawCell(food.x, food.y);
        },

        /**
         * Updates the score
         * @param {Number} score
         */
        setScore: function(score) {

            console.log(score);
            this.scoreContainer.innerHTML = score;
        }

    }

});
