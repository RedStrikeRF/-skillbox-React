import MASTERCARD from '../assets/images/mastercard.png';
import MIR from '../assets/images/mir.png';
import VISA from '../assets/images/visa.png';
import CARD from '../assets/images/card.png';

/* Номера карт для проверки
       мир: 2200700761452324
       виз: 4276161718418402
мастеркард: 5536914151738055
*/

export const cardImages = Object.freeze({
    mastercard: MASTERCARD,
    mir: MIR,
    visa: VISA,
    defaultCard: CARD,
});