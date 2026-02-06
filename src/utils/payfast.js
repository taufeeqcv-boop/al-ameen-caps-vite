import md5 from "crypto-js/md5";

/**
 * Generate PayFast security signature for payment form.
 * @param {Record<string, string>} data - Key-value pairs for PayFast
 * @param {string|null} passPhrase - PayFast passphrase (optional)
 * @returns {string} MD5 hash
 */
export const generateSignature = (data, passPhrase = null) => {
  let pfOutput = "";
  for (const key in data) {
    if (Object.prototype.hasOwnProperty.call(data, key)) {
      const val = data[key];
      if (val != null && val !== "") {
        const str = String(val).trim();
        pfOutput += `${key}=${encodeURIComponent(str).replace(/%20/g, "+")}&`;
      }
    }
  }

  let getString = pfOutput.slice(0, -1);

  if (passPhrase != null && passPhrase !== "") {
    getString += `&passphrase=${encodeURIComponent(String(passPhrase).trim()).replace(/%20/g, "+")}`;
  }

  return md5(getString).toString();
};
