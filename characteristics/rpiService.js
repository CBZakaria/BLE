var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var WifiCharacteristic = require('./installation/wifiCharacteristic');
var ConfigurationCharacteristic = require('./configurationCharacteristic');
var PlayerCharacteristic = require('./maintaining/playerCharacteristic');


class RPIService extends BlenoPrimaryService {
    constructor(){
        super({
            uuid: '00010010-89BD-43C8-9231-40F6E305F96D',
            characterstics: [
                new WifiCharacteristic(),
                new ConfigurationCharacteristic(),
                new PlayerCharacteristic()
            ]
        });
    }
} 
module.exports = RPIService;