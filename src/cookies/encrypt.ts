import encryptor from "simple-encryptor";

// const key = process.env.NEXT_AUTH_SECRET || process.env.SECRET;
const key = "asecretkeyasecretkeyasecretkeyasecretkeyasecretkey";

// if (!key) {
//   throw new Error("Secret is missing for Next Authentication. Please");
// }

export const { encrypt, decrypt } = encryptor(key);
