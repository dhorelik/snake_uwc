define(function () {

    return {

        initialize: function(widthLimit, heightLimit, cellSize) {

            this._size = cellSize;
            this._widthLimit = widthLimit;
            this._heightLimit = heightLimit;

            this
                .findBlocks()
                .set();

        },

        findBlocks: function() {

            this.domElem = document.getElementById('food');

            return this;

        },

        set: function() {

            this.x = Math.round(Math.random() * this._widthLimit);
            this.y =  Math.round(Math.random() * this._heightLimit);

            this.draw(this.x, this.y);

        },

        draw: function(x, y) {

            this.domElem.style.left = x * this._size + 'px';
            this.domElem.style.top = y * this._size + 'px';

        }

    }

});
