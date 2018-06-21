import {Characteristic, Descriptor} from 'bleno';

var BlenoCharacteristic = Characteristic;
var BlenoDescriptor = Descriptor;

class PlayerCharacteristic extends BlenoCharacteristic {
    constructor(){
        super({
            uuid: '00010003-89BD-43C8-9231-40F6E305F96D',
            properties: ['write','notify'],
            descriptors:[
                new BlenoDescriptor({
                    uuid: '2901',
                    value: 'Player Charactersitic'
                })
            ]
        });
    }
}
export default PlayerCharacteristic;