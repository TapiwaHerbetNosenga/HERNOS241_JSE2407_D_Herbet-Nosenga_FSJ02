import { useEffect } from 'react';
import InstallPrompt from '@/components/InstallPrompt';
import '@/styles/globals.css';

const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  }
};

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <InstallPrompt />
    </>
  );
}

export default MyApp;
