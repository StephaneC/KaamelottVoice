import { Plateform } from 'SkillActionLib/dist';
import { getRandomSound } from './data/sounds';

export const playRandomSound = (p: Plateform) => {
    const sound = getRandomSound();
    console.log('Will play random sound', sound);
    p.template.playAudio(sound.file, sound.title, `${sound.episode} - ${sound.character}`, null, null, sound.file, 0);
}