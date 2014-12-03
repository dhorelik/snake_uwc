define(['field', 'snake'], function(field, snake) {

    return {

        initialize: function(cellSize) {

            this
                .findBlocks()
                .bindEvents();

        },

        findBlocks: function() {

            this.startButton = document.getElementById('start');

            return this;

        },

        bindEvents: function() {

            this.startButton.addEventListener('click', this._onStart, false);
            document.addEventListener('gameOver', this._onEnd, false);

        },

        _onStart: function(e) {

            var cellSize = 20,
                speed = 100;

            ui.className = 'hidden';

            field.initialize(cellSize);
            snake.initialize(cellSize, speed);

            e.preventDefault();

        },

        _onEnd: function() {

            setTimeout(function() {
                ui.className = '';
            }, 1000);

        }

    }

});
