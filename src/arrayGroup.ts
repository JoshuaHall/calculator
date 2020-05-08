export function arrayGroup<T>(arr: T[], num: number): T[][] {
  if (num <= 0) {
    throw new Error('group num should be greater than 0');
  }

  const output: T[][] = [];

  for (let i = 0, len: number = arr.length; i < len; i += num) {
    output.push(arr.slice(i, i + num));
  }

  return output;
}
