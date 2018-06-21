import {Characteristic, Descriptor} from "bleno";

var BlenoCharacaterstic = Characteristic;
var BlenoDescriptor = Descriptor;

class WifiCharacteristic extends BlenoCharacaterstic {
    constructor() {
        super({
            uuid: '00010000-89BD-43C8-9231-40F6E305F96D',
            properties: ['write','notify'],
            descriptors: [
                new BlenoDescriptor ({
                    uuid: '2901',
                    value: 'Wifi Characterstic'
                })
            ]
        });
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

export default WifiCharacteristic;
