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