var bleno = require('bleno');
var RPIService = require('./characteristics/rpiService');

var service = new RPIService();

var name = "COMPANION-BLE"
console.log("Ello");
bleno.on('stateChange',function(state) {
    if ('poweredOn' === state) {
        bleno.startAdvertising(name,[service.uuid],function(err){
            if (err) {
                console.log(err);
            }
        });
    }
    else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart',function(err) {
    if(!err) {
        console.log('Advertising ...');

        bleno.setServices([
            service
        ]);
    }
});


