var bleno = require('bleno');

var BlenoCharacteristic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

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

        this._message = new Buffer(0); // ?
        this._updateMessageCallback = null;
    }
    
    onWriteRequest(data, offset, withoutResponse, callback) {
        console.log("L'utilisateur a envoyé un ordre au Player: " + this._message.toString('utf8'));
        if(this._updateMessageCallback) {
            this._updateMessageCallback(this._message);
        }
        callback(this.RESULT_SUCCESS);
    }

    onSubscribe(maxValuesize, updateMessageCallback) {
        this._updateMessageCallback = updateMessageCallback;
    }

    onUnsubscribe() {
        this._updateMessageCallback = null;
    }
}
module.exports = PlayerCharacteristic;