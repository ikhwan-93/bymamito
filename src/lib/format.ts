export function formatRM(cents: number): string {
  const rm = (cents / 100).toFixed(2);
  return `RM ${rm}`;
}
