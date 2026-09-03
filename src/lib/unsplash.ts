/** Unsplash Source — максимальное качество для вёрстки */
export function unsplashUrl(photoId: string, width = 3840, quality = 90) {
  const id = photoId.replace(/^photo-/, "");
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=max&w=${width}&q=${quality}`;
}
