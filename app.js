requirejs.config({
	urlArgs: "bust=" + (new Date()).getTime(),

    paths: {
        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
            './lib/jquery-2.1.3.min'
        ],
		'pathfinding' : './lib/pathfinding/pathfinding-browser.min',
		'system' : './system'
    }
});

requirejs(['main']);
