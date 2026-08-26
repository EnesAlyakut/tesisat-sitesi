export { win, window2 } from "./stages";

/**
 * Sogugun sicak hatti kestigi noktada kucuk kopru yayi cizer.
 * Teknik cizimlerde kesisen borular bu sekilde gosterilir.
 *
 * @param x       dikey inisin x konumu
 * @param fromY   inisin basladigi y
 * @param crossY  kesisimin oldugu y
 * @param toY     inisin bittigi y
 * @param r       kopru yaricapi (mobilde daha kucuk)
 */
export const crossDown = (
  x: number,
  fromY: number,
  crossY: number,
  toY: number,
  r = 8,
) => `M${x} ${fromY}V${crossY - r}a${r} ${r} 0 0 1 0 ${r * 2}V${toY}`;
