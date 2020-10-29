import { Plateform } from 'SkillActionLib/dist';
import { getRandomSound, getCaracterSound } from './data/sounds';

export const playRandomSound = (p: Plateform) => {
    const sound = getRandomSound();
    console.log('Will play random sound', sound);
    p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, sound.file, 0);
}

export const playCaracterSound = (p: Plateform) => {
    const caracter = p.entities.get('caracter');
    if (!caracter) {
        //FIXME refactor language
        p.template.simpleMessage('Je n\'ai pas compris le personnage demandé. Pouvez vous répéter ou essayer un autre personnage?', ' Pouvez vous répéter ou essayer un autre personnage?', false);
    } else {
        const sound = getCaracterSound(caracter);
        if (sound) {
            //FIXME refactor language
            p.template.simpleMessage('Je n\'ai pas compris le personnage demandé. Pouvez vous répéter ou essayer un autre personnage?', ' Pouvez vous répéter ou essayer un autre personnage?', false);
            return;
        }
        p.sessionStorage.setItem('caracter', caracter);
        console.log(`Will play ${caracter} sound`, sound);
        p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, sound.file, 0);
    }
}