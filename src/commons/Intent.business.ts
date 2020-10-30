import { Plateform } from 'SkillActionLib/dist';
import { getRandomSound, getCaracterSound } from './data/sounds';
import { createToken, readToken } from './utils';

export const playRandomSound = (p: Plateform) => {
    const sound = getRandomSound();
    console.log('Will play random sound', sound);
    p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, createToken(sound, false), 0);
}

export const nextSound = (p: Plateform) => {
    const token = p.inputUtils.getMediaToken();
    const t = readToken(token);
    let sound;
    if (t.isCharacter && t.character ) {
        sound = getCaracterSound(t.character);
    } else {
        sound = getRandomSound();
    }
    p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, createToken(sound, t.isCharacter ), 0);
}

export const playCaracterSound = (p: Plateform, character?: string) => {
    if (!character)
        character = p.entities.getValue('caracter');
    console.log('playCaracterSound ' + character);
    if (!character) {
        //FIXME refactor language
        p.template.simpleMessage('Je n\'ai pas compris le personnage demandé. Pouvez vous répéter ou essayer un autre personnage?', ' Pouvez vous répéter ou essayer un autre personnage?', false);
    } else {
        const sound = getCaracterSound(character);
        if (!sound) {
            //FIXME refactor language
            p.template.simpleMessage('Je n\'ai pas compris le personnage demandé. Pouvez vous répéter ou essayer un autre personnage?', ' Pouvez vous répéter ou essayer un autre personnage?', false);
            return;
        }
        p.sessionStorage.setItem('character', character);
        console.log(`Will play ${character} sound`, sound);
        p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null,  createToken(sound, true), 0);
    }
}