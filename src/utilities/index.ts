export const replaceItem = (arr: any[], idx: number, item: any) => {
  const newArray = [...arr.slice(0, idx), item, ...arr.slice(idx + 1)];
  return newArray;
};
