'use strict';
const uuid = require('uuid');
const model = require('../Models/index');

exports.getMessage = async function getMessage(data){
    console.log("getMessage: ", data, new Date().toLocaleTimeString());
    let error = false;
    let success = false;
    let { secret, id } = await getSecret(data)
    if (!data.from) {
        error = 'The from variable was not set'
    }
    if (!data.message) {
        error = 'The message variable was not set'
    }
    
    console.log("secret: ", secret);

    if ((data.from.length > 0 && data.message.length > 0) && (data.sent_timestamp) && (data.message_id)) {
        console.log('data.secret: ', data.secret);
        console.log('secret: ', secret);
        if (data.secret != secret) {
            error = "The secret value sent from the device does not match the one on the server";
        }
        else {
            success = true;
            data.phone_id = id;
            data.status = '1';
            data.type = '1';
            await saveDataMessages(data)
            console.log("data: ", data);
        }
    }
    
    if (error) {
        return {
            "payload": {
                "success": success,
                "error": error
            }
        }
    }
    
    return sendInstantMessage(data.from, data.phone_number)
}

function sendInstantMessage(to, phone_number){
    console.log("sendInstantMessage: ", new Date().toLocaleTimeString());
    let m = "Your message has been received";
    let f = phone_number;
    let s = true;
    let reply = [{
        "to": to,
        "message": m,
        "uuid": uuid.v1()
    }]
    // let reply = [];
    // Send JSON response back to SMSsync
    return {
        "payload": {
            "success": s,
            "task": "sent",
            "secret": "",
            "message": reply
        }
    }
}

exports.getSmsDeliveryReport = async function getSmsDeliveryReport(data){
    console.log("getSmsDeliveryReport: ", data, new Date().toLocaleTimeString());
    let { secret, id } = await getSecret(data)
    if (data.secret == secret) {
        let messageResults = data; 
        saveDataMessages(data);
        console.log("messageResults: ", messageResults);
    }
}

exports.getSentMessageUuids = function getSentMessageUuids(data){
    console.log("getSentMessageUuids: ", data, new Date().toLocaleTimeString());
    let dataMessages = data;
    let queuedMessages = data;
    // saveDataMessages(queuedMessages);
    console.log("queuedMessages: ", queuedMessages);
    return sendMessageUuidsWaitingForADeliveryReport(queuedMessages)
}

function sendMessageUuidsWaitingForADeliveryReport(data){
    console.log("sendMessageUuidsWaitingForADeliveryReport: ", data, new Date().toLocaleTimeString());
    for(let id of data.queued_messages){
        updateDataMessages({
            "id": id,
            'status': '3',
            "sent_timestamp": Date.now()
        })
    }
    return {
        "message_uuids": data.queued_messages
    }
}

exports.sendTask = async function sendTask(data){
    console.log("sendTask: ", data, new Date().toLocaleTimeString(), data);
    let { secret, id } = await getSecret(data);
    // console.log("secret: ", secret);
    // console.log("id: ", id);
    let response = {};
    let s = "false";
    let reply = [];
    let messages = await getTaskMessage(id, '2');
    for(let message of messages){
        reply.push({
            "to": message.sent_to,
            "message": message.message,
            "uuid": message.message_id
        });
    }
    s = "true";
    response = {
        "payload": {
            "success": s,
            "task": "send",
            "secret": secret,
            "messages": reply
        }
    }    
    return response
}

exports.sendMessagesUuidsForSmsDeliveryReport = async function sendMessagesUuidsForSmsDeliveryReport(data){
    console.log("sendMessagesUuidsForSmsDeliveryReport: ", new Date().toLocaleTimeString());
    let { secret, id } = await getSecret(data);
    let result = [];
    let messages = await getTaskMessage(id, '3');
    for(let message of messages){
        result.push(message.message_id)
    }
    let response = {
        "message_uuids": result
    }
    return response;
}

async function saveDataMessages(data){
    console.log("saveDataMessages: ", new Date().toLocaleTimeString());
    const newMessage = await model.messages.findOrCreate({where: {
        phone_id: data.phone_id,
        from: data.from,
        message: data.message,
        sent_timestamp: data.sent_timestamp,
        sent_to: data.sent_to,
        message_id: data.message_id,
        type: data.type,
        status: data.status,
        read: 0
    }});
    console.log("newMessage: ", JSON.stringify(newMessage.dataValues));
}

async function updateDataMessages(data){
    console.log('updateDataMessages: ', new Date().toLocaleTimeString());
    model.messages.update({
        status: data.status,
        sent_timestamp: data.sent_timestamp
    }, {
        where: {
            message_id: data.id
        }
    }).then(function(res){
        console.log('updateDataMessages: ', res);
    }).catch(function(err){
        console.log('updateDataMessages: ', err);
    })
}

async function getSecret(data){
    console.log("getSecret: ", data.phone_number, new Date().toLocaleTimeString());
    let secret = await model.phones.findOne({
        where: {
            'number': data.phone_number
        },
        attributes: ['secret', 'id', 'number']
    });
    console.log("secret: ", secret.dataValues);
    return secret
}

async function getTaskMessage(phone_id, status){
    console.log("getTaskMessage: ", new Date().toLocaleTimeString());
    const messages = await model.messages.findAll({where: {
        phone_id: phone_id,
        type: '2',
        status: status
    }});
    // console.log("messages: ", messages);
    return messages;
}