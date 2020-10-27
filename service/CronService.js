const connection = require('../config/connection');

exports.deleteExpiredMessage = function(){
    return new Promise(async function(resolve, reject){
        // let query = "SELECT messages.message, FROM_UNIXTIME(`sent_timestamp`/1000) as sent_timestamp, now(), DATEDIFF(NOW(), FROM_UNIXTIME(`sent_timestamp`/1000)) AS `time_diff` FROM `messages` WHERE DATEDIFF(NOW(), FROM_UNIXTIME(`sent_timestamp`/1000)) > 7 ORDER BY `sent_timestamp` DESC;";
        let query = "DELETE FROM `messages` WHERE DATEDIFF(NOW(), FROM_UNIXTIME(`sent_timestamp`/1000)) > 7 AND type = 1";
        console.log("qeury::", query);
        connection.query(query, function (error, results, fields) {
            if (error) {
                console.log('Error::', error.sqlMessage);
                resolve(false);
            }
            else {
                console.log("results::", results);
                resolve(results);
            }
        })
    })
}