// @ts-check

import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * @param {NextApiResponse} res
 * @param {string} value
 * @param {object} options
 * @returns {string} encrypted
 */
function setCookie(res, value, options = { name: "token" }) {
  const { name } = options;

  res.setHeader(
    "Set-Cookie",
    serialize(name, value, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 1 week,
      ...options,
    })
  );
}

/**
 * @param {NextApiRequest} req
 * @param {string} name
 * @returns {string}
 */
function getCookie(req, name = "token") {
  if (!"cookie" in req.headers) {
    return "";
  }

  const cookie = parse(req.headers.cookie);
  return cookie[name];
}

export { setCookie, getCookie };
