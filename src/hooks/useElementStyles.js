export const useElementStyles = () => {
  const withError = (condition) => {
    if (!condition) return '';
    if (typeof condition === 'function' && condition()) {
      return 'error';
    } else if (!!condition) {
      return 'error';
    }
    return '';
  };

  const withContent = (condition) => {
    if (!condition) return '';
    if (typeof condition === 'function' && condition()) {
      return 'filled';
    } else if (!!condition) {
      return 'filled';
    }
    return '';
  };

  return {
    withError, withContent
  }
};