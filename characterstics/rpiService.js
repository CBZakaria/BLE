var bleno = require('bleno');

var WifiCharacteristic = require('./installation/wifiCharacteristic');
var ConfigurationCharacterstic = require('./installation/configurationCharacteristic');
var PlayerCharacteristic = require('./maintaining/playerCharacterstic');

class RPIService extends bleno.PrimaryService {
    constructor(){
        super({
            uuid: '00010010-89BD-43C8-9231-40F6E305F96D',
            characterstics: [
                new WifiCharacteristic(),
                new ConfigurationCharacterstic(),
                new PlayerCharacteristic()
            ]
        });
    }
} 
export default RPIService;