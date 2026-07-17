export const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve((r.result as string).split(',')[1] || '');
    r.onerror = () => reject(new Error('Could not read that file from your device.'));
    r.readAsDataURL(file);
  });

/** Uploads a resume file as JSON base64 — works on both the dev server and Vercel. */
export const uploadResumeFile = async (file: File, signal?: AbortSignal) => {
  const data = await fileToBase64(file);
  return fetch('/api/extract-resume', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: file.name, mimeType: file.type, data }),
    signal,
  });
};
