import * as sounds from "./sounds.json";
import { getRandom } from "../utils";

const baseUrl = "https://kaamelott-soundboard.2ec0b4.fr/sounds/"

export class Sound {
    character: string;
    episode: string;
    file: string;
    title: string;
}

const mapUrl = (s: Sound): Sound => {
    if (s) {
        s.file = baseUrl + s.file;
    }
    return s;
}

export const getSound = (file: string): Sound => {
    return sounds.find(s => s.file === file);
}


export const getRandomSound = (): Sound => {
    const s = getRandom(sounds);
    return mapUrl(s);
}