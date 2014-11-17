define(['field', 'snake'], function(field, snake) {

    return {

        initialize: function(cellSize) {

            this
                .findBlocks()
                .bindEvents();



        },

        findBlocks: function() {

            this.startButton = document.getElementById('start');
            this.scoreContainer = document.getElementById('score');

            return this;

        },

        bindEvents: function() {

            this.startButton.addEventListener('click', this._onStart, false);

        },

        _onStart: function() {

            // todo grab dynamic cellsize
            var cellSize = 20;

            ui.className = 'hidden';

            field.initialize(cellSize);
            snake.initialize(cellSize);

        }



    }

});
