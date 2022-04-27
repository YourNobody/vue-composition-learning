const directive = directiveName => {
  return {
    name: directiveName,
    mounted(el, binding) {
      const value = binding.value && binding.value.trim();
      if (!value) {
        if ('focus' in el) return el.focus();
        else return;
      }
      console.log(el, value);
      const neededEl = el.querySelector(value);
      if (neededEl) return neededEl.focus();

      return el.focus();
    }
  }
};

export default directive('focus');