// crypto module
const crypto = require("crypto");
const bcrypt = require('bcrypt');
const moment = require('moment');
const algorithm = "aes-256-cbc"; //Using AES encryption

function encryptPassword(plainPassword){
  const hash = bcrypt.hashSync(plainPassword, 12);

  return hash;
}

function decryptPassword(plainPassword, hashPassword){
  const isValid = bcrypt.compareSync(plainPassword, hashPassword);

  return isValid;
}

// let issuedAt = new Date();

// let expiredAt = new Date();
// expiredAt.setMinutes(expiredAt.getMinutes() + 30);

// console.log("decrypt : " + decrypt('0f9d28db047cb78d42b4ac472f7dea31:fe935808afbb680f593c7cd2e3e10f94:a9ba2f19d71c2470558db41a75d968157b01a3896150156782f6b88badb933d580ce922c5d0940a4ef29c03e97a733dd09b6134690d770f15f5b80b44a1264a77aba0801473d0e8c9351ce32021a89ea', '@utHT0k3n123!DevOps'));
// console.log("expiredAt : " + `${moment(expiredAt).format("YYYY-MM-DDTHH:mm:ss")}`);


// console.log("encrypted : " + encryptPassword('admin123'));
// console.log("encrypted : " + decryptPassword('admin123', '$2b$12$nm0gIWfetGobWuKdppo6QeNbnf6VuS56obDqY/GMv.QRsUkIxhh.6'));


module.exports = {
  encryptPassword,
  decryptPassword
};