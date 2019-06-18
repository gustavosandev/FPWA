// Esse script executa em segundo plano no navegador, ele é separada da página, ele sincroniza,
// e tbm faz notificações entre outros.
// O ciclo de vida do SW passa por basicamente 3 etapas básicas e se extendendo pra 5.
// Elas são Install, Active e Fetch
var CACHE_NAME = 'static-v1'; // Aqui atribuimos o nome do nosse cache


// Função para instalar nossos arquivos, ele é chamado só uma vez, se houver alteração de 
// algum arquivo, é chamado de volta.
self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open(CACHE_NAME).then(function(cache) {
     return cache.addAll([
      // extremamente importante acertar o caminho!
      // não se adiciona o sw.js, pois ele tem q ser chamado só online
        './',
        './index.html',
        './estilo.css',
        './index.js',
        './manifest.json',
        './bootstrap.min.css',
     ]);
   })
 );
});

// Função que também é chamada só uma vez, ele verifica a versão do SW e apaga versões antigas
self.addEventListener('activate', function activator(event) {
  event.waitUntil(
    caches.keys().then(function (keys) {
      return Promise.all(keys
        .filter(function (key) {
          return key.indexOf(CACHE_NAME) !== 0;
        })
        .map(function (key) {
          return caches.delete(key);
        })
      );
    })
  );
});

// Função onde verificamos se tem algum arquivo no cache, e retorna caso positivo, ele chama o arquivo.
self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});






