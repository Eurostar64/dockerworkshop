var express = require('express');
var redis = require('redis');
var app = express();

var redisDNS = process.env.REDISTAG;

var client = redis.createClient(6379, redisDNS); //creates a new client

client.on('connect', function() {
    console.log('connected to redis');
});

var keyName = "visits";



app.get('/', function (req, res) {


    client.rpush([keyName, new Date().toISOString()], function(err, reply){

    });

    client.llen(keyName, function(err, reply) {
       
        // console.log("REDIS LLEN:" + reply);

        var counter = parseInt(reply);

        var wordTimes = "times";
        if(counter == 1){
            wordTimes = "time";
        }

        res.send("You have accessed this website " + counter + " time");
    });






    // client.get(keyName, function(err, reply) {

    //     var counter;

    //     if(reply == null){

    //         counter = 1;

    //     }else{

    //         counter = parseInt(reply);
    //         counter++;

    //     }

    //     client.set(keyName, ''+counter, function(err, reply) {
    //         // console.log("REDIS SET: " + reply);
    //     });

    //     var wordTimes = "times";
    //     if(counter == 1){
    //         wordTimes = "time";
    //     }

    //     res.send("You have accessed this website " + counter + " time");
        
    // });


});

process.on('SIGINT', function() {
    process.exit();
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
})