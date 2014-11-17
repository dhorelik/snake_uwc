define(function () {

    return {

        initialize: function (cellSize) {

            this._cellSize = cellSize;

            this
                .findBlocks()
                .setSize();

        },

        findBlocks: function () {

            this.domElem = document.getElementById('field');

            return this;

        },

        /**
         * Sets field size
         */
        setSize: function () {

            var width = this.calculateSize('width'),
                height = this.calculateSize('height');

            this.domElem.style.width = width + 'px';
            this.domElem.style.height = height + 'px';

            this.setLimits(width, height);

        },

        /**
         * Field area depends on window dimensions
         *
         * param {String} side ['width', 'height']
         * returns {Number}
         */
        calculateSize: function (side) {

            var size,
                winSize = (side === 'width')
                    ? window.innerWidth
                    : window.innerHeight;

            size = Math.floor(winSize - 50);

            // Dimensions should be adjusted in order to fit certain number of cells,
            // without extra space on the sides
            size = size - (size % this._cellSize);

            return size;

        },

        /**
         * Sets the snake coordinates limit, used to catch border collision
         *
         * param {Number} width
         * param {Number} height
         */
        setLimits: function (width, height) {

            this._widthLimit = width / this._cellSize;
            this._heightLimit = height / this._cellSize;

        }

    }

});
