export function toAbsoluteUrl(url: string) {
  return new URL(url, location.href).href;
}
