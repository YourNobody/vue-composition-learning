export const useDocumentContentLoaded = (...callbacks) => {
  const callAlLCallbacks = () => {
    callbacks.forEach(cb => cb());
  };
  if (window && document) {
    document.addEventListener('DOMContentLoaded', callAlLCallbacks);
    window.addEventListener('beforeunload', () => {
      document.removeEventListener('DOMContentLoaded', callAlLCallbacks);
    });
  }
};