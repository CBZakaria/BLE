import { Characteristic, Descriptor } from "bleno";

var BlenoCharacteristic = Characteristic;
var BlenoDiscriptor = Descriptor;

class ConfigurationCharacterstic extends BlenoCharacteristic {
    constructor() {
        super({
            uuid: '00010001-89BD-43C8-9231-40F6E305F96D',
            properties: ['write', 'notify'],
            descriptors: [
                new BlenoDiscriptor({
                    uuid: '2901',
                    value: 'Configuration Characteristic'
                })
            ]
        });
        this._message = new Message(); // ?
        this._updateMessageCallback = null;
    }

    onWriteRequest(data, offset, withoutResponse, callback) {
        this._message = data;
        if(this._updateMessageCallback) {
            this._updateMessageCallback(this._message);
        }
    }

    onSubscribe(maxValuesize, updateMessageCallback) {
        this._updateMessageCallback = updateMessageCallback;
    }

    onUnsubscribe() {
        this._updateMessageCallback = null;
    }
}


export default ConfigurationCharacterstic;