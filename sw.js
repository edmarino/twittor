//sw.js

// imports
importScripts('js/sw-utils.js');


const STATIC_CACHE    = 'static-v1';
const DYNAMIC_CACHE   = 'dynamic-v2';
const INMUTABLE_CACHE = 'inmutable-v1';


const APP_SHELL = [
    // '/',
    'index.html',
    'css/style.css',
    'img/favicon.ico',
    'img/avatars/hulk.jpg',
    'img/avatars/ironman.jpg',
    'img/avatars/spiderman.jpg',
    'img/avatars/thor.jpg',
    'img/avatars/wolverine.jpg',
    'js/app.js',
    'js/sw-utils.js'
];

const APP_SHELL_INMUTABLE = [
    'https://fonts.googleapis.com/css?family=Quicksand:300,400',
    'https://fonts.googleapis.com/css?family=Lato:400,300',
    'https://use.fontawesome.com/releases/v5.3.1/css/all.css',
    'css/animate.css',
    'js/libs/jquery.js'
];

//Instalación: Carga los caches

self.addEventListener('install', e => {
    const cacheStatic = caches.open( STATIC_CACHE ).then(cache => 
        cache.addAll( APP_SHELL ));
    //const cacheStatic=caches.open(STATIC_CACHE).then(cache=>{});

    const cacheInmutable = caches.open( INMUTABLE_CACHE ).then(cache => 
        cache.addAll( APP_SHELL_INMUTABLE ));
	//const cacheInmutable=caches.open(INMUTABLE_CACHE).then(cache=>{
    e.waitUntil( Promise.all([ cacheStatic, cacheInmutable ])  );
}); //self.addEventListener('install',e=>{});		



//Activación y borrado de caches innecesarios
self.addEventListener('activate', e => {
    const respuesta = caches.keys().then( keys => {
		//static
        keys.forEach( key => {
            if (  key !== STATIC_CACHE && key.includes('static') ) {
                return caches.delete(key);
            } //if(key!==CACHE_STATIC_NAME&&key.includes('static')){

            if (  key !== DYNAMIC_CACHE && key.includes('dynamic') ) {
                return caches.delete(key);
            }

        });

    });

    e.waitUntil( respuesta );

});




self.addEventListener( 'fetch', e => {


    const respuesta = caches.match( e.request ).then( res => {

        if ( res ) {
            return res;
        } else {

            return fetch( e.request ).then( newRes => {

                return actualizaCacheDinamico( DYNAMIC_CACHE, e.request, newRes );

            });

        }

    });



    e.respondWith( respuesta );

});

