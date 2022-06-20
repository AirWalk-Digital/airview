export function getRisk(impact, probability) {
  if (impact === 2 && probability === 3) return 3;
  const n = impact + probability;
  if (n < 4) return 1;
  if (n > 5) return 3;
  return 2;
}
