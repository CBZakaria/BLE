// https://github.com/noble/bleno/issues/301 //

var util                = require('util');
var bleno               = require('bleno');
var BlenoCharacteristic = bleno.Characteristic;
var wifi                = require('wifi-control');
var Descriptor          = bleno.Descriptor;

function ScanWifiCharacteristic() {
  ScanWifiCharacteristic.super_.call(this, {
    uuid: '5099cbc8a71f42928158bf4f25ae9948',
    properties: ['notify'],
    descriptors: [ 
      new Descriptor({
        uuid: 'fff1',
        value: 'Scans for WiFi networks in range and returns the collection.' // static value, must be of type Buffer or string if set
      })
    ]
  });
};

util.inherits(ScanWifiCharacteristic, BlenoCharacteristic);

ScanWifiCharacteristic.prototype.onSubscribe = function(maxValueSize, updateValueCallback) {
    wifi.scanForWiFi(function(err, response) {
      if (err) console.log(err);

      var data = new Buffer(JSON.stringify(response));

      var lastSliceIndex = null;
      var tempBuffer = null;
      // Loop through the data at iterations of the max val size ( + 1 for exclusive slices)
      for(var x = 0; x < data.length; x += maxValueSize)
      {
        tempBuffer = data.slice(x, x + maxValueSize);
        // console.log("BUFF #[${x} - ${x + maxValueSize + 1}]: " + tempBuffer.toString())
        updateValueCallback(tempBuffer)

        // Set this last slice index for potentially sending tail of data
        lastSliceIndex = x + maxValueSize;
      }
      
      if(lastSliceIndex < data.length) {
        tempBuffer = data.slice(lastSliceIndex);
        // console.log("LAST BUFF: " + tempBuffer.toString());
        updateValueCallback(tempBuffer);
      }

      updateValueCallback(new Buffer("EOM"));
    });
};

module.exports = ScanWifiCharacteristic;