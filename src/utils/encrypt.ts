import encryptor from "simple-encryptor";

function encrypt(value: object | string, secret: string): string {
  return encryptor(secret).encrypt(value);
}

function decrypt(cypherText: string, secret: string): string {
  const decrypted = encryptor(secret).decrypt(cypherText);

  if (decrypted != null) {
    return decrypted;
  }

  return "";
}

export { encrypt, decrypt };
