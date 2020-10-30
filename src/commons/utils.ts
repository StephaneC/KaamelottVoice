import { Sound } from "./data/sounds";

export const getRandom = (array: Array<any>): any => {
    if (!array || array.length === 0) return null;
    let i = Math.floor(Math.random() * Math.floor(array.length));
    return array[i];
}

export const createToken = (sound: Sound, isCharacter): string => {
    return JSON.stringify({
        character: sound.character,
        isCharacter,
        file: sound.file
    })
}

export const readToken = (token: string): { character, isCharacter, file } => {
    return JSON.parse(token);
}