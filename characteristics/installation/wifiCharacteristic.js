var bleno = require("bleno");

var BlenoCharacaterstic = bleno.Characteristic;
var BlenoDescriptor = bleno.Descriptor;

class WifiCharacteristic extends BlenoCharacaterstic {
    constructor() {
        super({
            uuid: '00010001-89BD-43C8-9231-40F6E305F96D',
            properties: ['read','write','notify'],
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
        var objJson = JSON.parse(this._message.toString('utf8'));
        console.log("L'utilisateur a sélectionné un wifi: " + this._message.toString('utf8'));
        if (objJson.name === "gentle-cormorant") {
            this._message = Buffer.from("Done !");
        }
        else {
            this._message = Buffer.from("Unkown user :o ");
        }        
        if(this._updateMessageCallback) {
            objJson.name = "Hamid";
            this._message = Buffer.from("Hamid");
            this._updateMessageCallback(this._message);
        }
        callback(this.RESULT_SUCCESS);
    }

    onReadRequest(offset,callback){
        console.log("Read ... "+ this._message)
        callback(this.RESULT_SUCCESS,this._message);
    }
    onSubscribe(maxValuesize, updateMessageCallback) {
        this._updateMessageCallback = updateMessageCallback;
    }
    onUnsubscribe() {
        this._updateMessageCallback = null;
    }
}

module.exports =  WifiCharacteristic;
