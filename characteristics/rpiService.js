var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var WifiCharacteristic = require('./installation/wifiCharacteristic');
var ConfigurationCharacteristic = require('./installation/configurationCharacteristic');
var PlayerCharacteristic = require('./maintaining/playerCharacteristic');
var wifiChara = new WifiCharacteristic();
var configchara = new ConfigurationCharacteristic();
var playerChara = new PlayerCharacteristic();

class RPIService extends BlenoPrimaryService {
    constructor() {
        super({
            uuid: '00010010-89BD-43C8-9231-40F6E305F96D',
            characteristics: [
                new WifiCharacteristic(),
                new ConfigurationCharacteristic(),
                new PlayerCharacteristic()
            ]
        });
    }
} 
module.exports = RPIService;