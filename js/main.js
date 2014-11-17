define(['ui', 'field', 'snake', 'keyrouter'], function(ui, field, snake, keyrouter) {

    ui.initialize();

    document.addEventListener('keydown', keyrouter.bindKeys, false);

});
