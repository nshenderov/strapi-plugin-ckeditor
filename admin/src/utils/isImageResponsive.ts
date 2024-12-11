export function isImageResponsive(imgFormats: { [k: string]: Object }): boolean {
  const formats = Object.keys(imgFormats);
  const isResponsive = !(formats.length === 1 && formats[0] === 'thumbnail');
  return isResponsive;
}
