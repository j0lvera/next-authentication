import encryptor from "simple-encryptor";

function encrypt(value: object | string, secret: string) {
  return encryptor(secret).encrypt(value);
}

function decrypt(cypherText: string, secret: string) {
  return encryptor(secret).decrypt(cypherText);
}

export { encrypt, decrypt };
