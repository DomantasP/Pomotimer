requirejs.config({
    //By default load any module IDs from js/lib
    baseUrl: 'assets/js',
    //except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
    paths: {
        jquery: 'https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min',        
        logic: 'logic',
        ui: 'UIscript',
        fontAwesome: 'https://use.fontawesome.com/164003fdd6',
    }
});

requirejs(['jquery','fontAwesome','logic','ui']);