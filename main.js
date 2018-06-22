var bleno = require('bleno');
var RPIService = require('./characterstics/rpiService')


var name = "COMPANION-BLE"

bleno.onStateChange(function(state) {
    if ('powerdOn' === state) {
        bleno.startAdvertising(name,[RPIService.uuid],function(err){
            if (err) {
                console.log(err);
            }
        });
    }
    else {
        bleno.stopAdvertising();
    }
});

bleno.onAdvertisingStart(function(err){
    if(!err) {
        console.log('Advertising ...');
        
        bleno.setServices([
            RPIService
        ]);
    }
});