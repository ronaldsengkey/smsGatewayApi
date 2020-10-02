'use strict';

var utils = require('../utils/writer.js');
var Message = require('../service/MessageService');

module.exports.getMessage = async function getMessage (req, res, next) {
    let response = {}
    let task = req.swagger.params['task'].value;
    let phone_number = req.swagger.params['phone_number'].value;
    let body = req.swagger.params['body'].value;
    body.phone_number = phone_number;
    console.log("getMessage: ", new Date().toLocaleTimeString());
    console.log("task: ", task);
    console.log("body: ", body);
    if (task == 'result') {
        response = await Message.getSmsDeliveryReport(body);
    }
    else if (task == 'sent') {
        response = await Message.getSentMessageUuids(body);
    }
    else {
        response = await Message.getMessage(body);
    }
    console.log("response: ", response);
    utils.writeJson(res, response);
};

module.exports.sentTask = async function sentTask(req, res, next){
    let response = {}
    let task = req.swagger.params['task'].value;
    console.log("sentTask: ", new Date().toLocaleTimeString());
    console.log("task: ", task);
    let body = {
        phone_number: req.swagger.params['phone_number'].value
    }
    if (task == 'send') {
        response = await Message.sendTask(body);
    }
    else if (task == 'result') {
        response = await Message.sendMessagesUuidsForSmsDeliveryReport(body);
    }
    else {
        
    }
    console.log("response: ", response);
    utils.writeJson(res, response);
}