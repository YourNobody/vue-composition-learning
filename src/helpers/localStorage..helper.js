export const LS = keyName => {
  const set = item => {
    if (item instanceof Object || item instanceof Array) {
      localStorage.setItem(keyName, JSON.stringify(item));
    } else if (typeof item === 'function') {
      return;
    } else {
      localStorage.setItem(keyName, item);
    }
  };

  const remove = () => {
    localStorage.removeItem(keyName);
  }

  const get = (toParse = false) => {
    const item = localStorage.getItem(keyName);
    if (!item) return null;
    if (toParse) return JSON.parse(item);
    if (item === 'true') return true;
    else if (item === 'false') return false;
    return item;
  }

  window.onbeforeunload = e => {
    localStorage.clear();
    window.onbeforeunload = null;
  };

  return {
    set, remove, get
  };
};