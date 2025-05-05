export const upscaleGoogleAvatar = (url: string | null, size = 400) => {
  if (!url) return null;
  // replace "/s44-…" or "/s64-…" with `/s{size}-`
  return url.replace(/\/s\d+-[^/]+\//, `/s${size}-c/`);
};