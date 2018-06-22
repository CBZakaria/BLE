var bleno = require("bleno");

var BlenoCharacaterstic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

class WifiCharacteristic extends BlenoCharacaterstic {
    constructor() {
        super({
            uuid: '00010001-89BD-43C8-9231-40F6E305F96D',
            properties: ['write','notify'],
            descriptors: [
                new BlenoDescriptor ({
                    uuid: '2901',
                    value: 'Wifi Characterstic'
                })
            ]
        });
        this._message = new Buffer(0); // ?
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

module.exports =  WifiCharacteristic;