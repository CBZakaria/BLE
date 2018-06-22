var bleno = require('bleno');

var BlenoPrimaryService = bleno.PrimaryService;

var WifiCharacteristic = require('./installation/wifiCharacteristic');
var ConfigurationCharacteristic = require('./installation/configurationCharacteristic');
var PlayerCharacteristic = require('./maintaining/playerCharacteristic');
var wifiCharacteristic = new WifiCharacteristic();
var configurationCharacteristic = new ConfigurationCharacteristic();
var playerCharacteristic = new PlayerCharacteristic();
class RPIService extends BlenoPrimaryService {
    constructor(){
        super({
            uuid: '00010010-89BD-43C8-9231-40F6E305F96D',
            characterstics: [
               wifiCharacteristic,
               configurationCharacteristic,
               playerCharacteristic
            ]
        });
    }
} 
module.exports = RPIService;