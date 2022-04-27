import {generateName, low, LS} from '@/helpers';

const directive = directiveName => {
  const animationClasses = ['show_top', 'hide_bottom'];
  const toInteract = (el, binding) => {
    let { arg, value } = binding;
    if (!arg && value && typeof value === 'string') {
      arg = low(value);
    }
    if (!value || !el || !arg) return;

    // const { set, get } = LS(generateName(directiveName, el.tagName, el.className, arg));
    //
    // if (!get()) {
    //   set(true);
    // } else return;

    for (const className of animationClasses) {
      if (el.classList.contains(className)) el.classList.remove(className);
    }

    switch (low(arg)) {
      case 'top': {
        el.classList.add('show_top');
        break;
      }
      case 'bottom': {
        el.classList.add('hide_bottom');
        break;
      }
      default:
        return;
    }
  };

  return {
    name: directiveName,
    mounted(el, binding) {
      toInteract(el, binding);
    },
    updated(el, binding) {
      toInteract(el, binding);
    }
  };
};

export default directive('interactive');