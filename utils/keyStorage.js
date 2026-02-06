export async function getKey() {
  let keyData = localStorage.getItem("aesKey");

  if (!keyData) {
    const key = await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );

    const exported = await crypto.subtle.exportKey("raw", key);
    localStorage.setItem(
      "aesKey",
      btoa(String.fromCharCode(...new Uint8Array(exported)))
    );
    return key;
  }

  const raw = Uint8Array.from(atob(keyData), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", true, [
    "encrypt",
    "decrypt",
  ]);
}
