'use strict';

const model = require('../Models/index');
const mail = require('./MailService');
const crypto = require('crypto');
const secret = process.env.secret;

exports.createUser = function(data){
  return new Promise(async function(resolve){
    try {
      mail.sendMail();
      data.password = await hash(generateRandomString());
      data.status = '1';
      const user = await model.users.create(data);
      let result = await user.save();
      // console.log("result: ", result);
      resolve({
        "responseCode": "200",
        "responseMessage": "success!!"
      })
    } catch (error) {
      console.log("error: ", error);
      resolve({
        "responseCode": "500",
        "responseMessage": "error!!"
      })
    }
  })
}

exports.getUser = function(){
  return new Promise(async function(resolve){
    try {
      let result = await model.users.findAll({});;
      // console.log("result: ", result);
      resolve({
        "responseCode": "200",
        "responseMessage": "success!!",
        "data": result
      })
    } catch (error) {
      console.log("error: ", error);
      resolve({
        "responseCode": "500",
        "responseMessage": "error!!"
      })
    }
  })
}

async function hash(password) {
  return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(8).toString("hex")

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          resolve(salt + ":" + derivedKey.toString('hex'))
      });
  })
}

async function verify(password, hash) {
  return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(":")
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
          if (err) reject(err);
          console.log("key: ", key);
          console.log("derivedKey.toString('hex'): ", derivedKey.toString('hex'));
          resolve(key == derivedKey.toString('hex'))
      });
  })
}

function generateRandomString(length = 8) {
  let result = '';
  let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  console.log("generateRandomString: ", result);
  return result;
}