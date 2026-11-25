export async function encryptMessage(plaintext: string): Promise<{ ciphertext: string; iv: string; key: string }> {
  const keyBytes = crypto.getRandomValues(new Uint8Array(32));
  const ivBytes = crypto.getRandomValues(new Uint8Array(12));
  const key = await crypto.subtle.importKey("raw", keyBytes, { name: "AES-GCM" }, false, ["encrypt"]);
  const encrypted = await crypto.subtle.encrypt({ name: "AES-GCM", iv: ivBytes }, key, new TextEncoder().encode(plaintext));
  const toBase64Url = (bytes: Uint8Array) => btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
  return { ciphertext: toBase64Url(new Uint8Array(encrypted)), iv: toBase64Url(ivBytes), key: toBase64Url(keyBytes) };
}
