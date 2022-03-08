const truncate = (num: number | string, idx = 2) => +num.toString().slice(0, num.toString().indexOf('.') + (idx + 1));

export { truncate };
