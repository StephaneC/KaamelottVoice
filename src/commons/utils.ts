export const getRandom = (array: Array<any>): any => {
    if (!array || array.length === 0) return null;
    let i = Math.floor(Math.random() * Math.floor(array.length));
    return array[i];
}