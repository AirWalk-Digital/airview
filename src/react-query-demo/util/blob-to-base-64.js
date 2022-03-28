export function blobToBase64(blob) {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise((resolve) => {
    reader.onloadend = () => {
      const s = reader.result;
      const b64Encoded = s.replace(/^data:[a-z/*]+;base64,/, "");
      resolve(b64Encoded);
    };
  });
}
