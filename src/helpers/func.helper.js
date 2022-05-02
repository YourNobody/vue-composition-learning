export const low = str => {
  if (!str) return '';
  if (typeof str === 'string') return str.toLowerCase();
  return str;
}

export const up = str => {
  if (!str) return '';
  if (typeof str === 'string') return str.toUpperCase();
  return str;
}

export const generateName = (...values) => {
  if (!values) throw new Error(`Can't generate from empty arguments`);
  return values.reduce((acc, value, index) => {
    if (value.toString) {
      acc += index ? '-' + low(value.toString()) : low(value.toString());
    }
    return acc;
  }, '');
}

export const insertInto = (
  str,
  obj = { index: 1, value: '' },
  options = { splitter: ' ', wrapWithLeft: '', wrapWithRight: '' }
) => {
  const splitted = str.split(options.splitter);
  splitted.splice(obj.index, 0, wrapLine(obj.value, options.wrapWithLeft, options.wrapWithRight));
  return splitted.join(options.splitter);
};

export const insertIntoName = (str, value) => {
  return insertInto(str, { index: 1, value }, { splitter: ' ', wrapWithLeft: '<', wrapWithRight: '>' });
}

export const wrapLine = (str, wrapWithLeft = '', wrapWithRight = '') => {
  if (!str) return '';
  return `${wrapWithLeft}${str}${wrapWithRight}`;
}