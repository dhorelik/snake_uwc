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

            // +1 adjusts for right and bottom cell borders
            this.domElem.style.width = width + 1 + 'px';
            this.domElem.style.height = height + 1 + 'px';

            this.setLimits(width, height);

        },

        /**
         * Calculates field area based on window dimensions
         * param {String} side ['width', 'height']
         * returns {Number}
         */
        calculateSize: function (side) {

            var size,
                winSize = (side === 'width')
                    ? window.innerWidth
                    : window.innerHeight;

            size = Math.floor(winSize - 20);

            // Dimensions should be adjusted in order to fit certain number of cells,
            // without extra space on the sides
            size = size - (size % this._cellSize);

            if (side === 'height')
                this.center(winSize, size);

            return size;

        },

        /**
         * Centers the field vertically
         * @param {Number} winSize
         * @param {Number} size
         */
        center: function(winSize, size) {
            // -2 adjusts for field borders
            this.domElem.style.marginTop = Math.floor((winSize - size - 2) / 2) + 'px';
        },

        /**
         * Sets the snake coordinates limit, used to catch border collision
         * param {Number} width
         * param {Number} height
         */
        setLimits: function (width, height) {

            this._widthLimit = width / this._cellSize;
            this._heightLimit = height / this._cellSize;

        }

    }

});
