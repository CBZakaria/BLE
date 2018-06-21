import {PrimaryService} from 'bleno';

import './installation/wifiCharacteristic';
import './installation/configurationCharacteristic';
import './maintaining/playerCharacterstic';
import './maintaining/rpiCharacteristic';
import WifiCharacteristic from './installation/wifiCharacteristic';
import ConfigurationCharacterstic from './installation/configurationCharacteristic';
import PlayerCharacteristic from './maintaining/rpiCharacteristic';

class RPIService extends PrimaryService {
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