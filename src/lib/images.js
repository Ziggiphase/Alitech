// Image helpers shared by the shop and the admin

/** Serve a Cloudinary photo resized + in the best format for the visitor's phone (WebP/AVIF). */
export function cld(url, width = 800) {
  if (!url || !url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  return url.replace('/upload/', `/upload/f_auto,q_auto,c_limit,w_${width}/`);
}

/** Shrink a photo in the browser before uploading (saves the seller's mobile data). */
export async function shrinkImage(file, maxSize = 1600, quality = 0.85) {
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext('2d').drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise(res => canvas.toBlob(res, 'image/jpeg', quality));
    return blob || file;
  } catch {
    return file; // e.g. formats the browser can't decode — upload as-is
  }
}
