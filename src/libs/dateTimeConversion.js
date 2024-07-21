export function remapDateTime(str) {
  return str.replace('T', ' ').substring(0, 16);
}
