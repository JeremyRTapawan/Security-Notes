export async function generateKey(): Promise<CryptoKey> {
  return crypto.subtle.generateKey(
    { name: "AES-GCM", length: 256 },
    true,
    ["encrypt", "decrypt"]
  );
}

export async function encryptNote(text: string, key: CryptoKey) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const enc = new TextEncoder();
  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(text)
  );
  return { encrypted: Array.from(new Uint8Array(encrypted)), iv: Array.from(iv) };
}

export async function decryptNote(encryptedArray: number[], key: CryptoKey, ivArray: number[]) {
  const iv = new Uint8Array(ivArray);
  const encrypted = new Uint8Array(encryptedArray).buffer;
  const decrypted = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, encrypted);
  return new TextDecoder().decode(decrypted);
}
