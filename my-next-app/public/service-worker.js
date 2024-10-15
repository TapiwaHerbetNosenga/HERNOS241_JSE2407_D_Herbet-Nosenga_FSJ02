self.addEventListener('install', function (event) {
    console.log('Service worker installed.');
    // You can cache files here if needed
  });
  
  self.addEventListener('fetch', function (event) {
    // You can handle fetch events here if needed
  });
  