define(function () {

    return {

        initialize: function(widthLimit, heightLimit, cellSize) {

            this._size = cellSize;
            this._widthLimit = widthLimit;
            this._heightLimit = heightLimit;

            this
                .findBlocks()
                .setSize()
                .setPosition();

        },

        findBlocks: function() {

            this.domElem = document.getElementById('food');

            return this;

        },

        setSize: function() {

            this.domElem.style.width = this._size + 'px';
            this.domElem.style.height = this._size + 'px';

            return this;

        },

        /**
         *
         * @param {Array} snakeBody
         */
        setPosition: function(snakeBody) {

            this.x = Math.round(Math.random() * this._widthLimit);
            this.y =  Math.round(Math.random() * this._heightLimit);

            snakeBody
                ? this.checkPosition(snakeBody)
                : this.draw(this.x, this.y);

        },

        /**
         * Doesn't allow placing food on current snake position
         * @param {Array} snakeBody
         */
        checkPosition: function(snakeBody) {

            for (var i = 0, l = snakeBody.length; i < l; i++) {
                if (snakeBody[i].x === this.x && snakeBody[i].y === this.y) {
                    this.setPosition(snakeBody);
                    return;
                }
            }

            this.draw(this.x, this.y);

        },

        draw: function(x, y) {

            this.domElem.style.left = x * this._size + 'px';
            this.domElem.style.top = y * this._size + 'px';

        }

    }

});
