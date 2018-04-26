/******************************************************************************
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 Alan Thiessen
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 *
 ******************************************************************************/

'use strict';


const {
    Action,     // Action base class
    Adapter,    // Adapter base class
    Constants,  // Constants used throughout the package
    Database,   // Class for interacting with the gateway's settings database
    Deferred,   // Wrapper for a promise, primarily used internally
    Device,     // Device base class
    Event,      // Event base class
    Property,   // Property base class
    Utils,      // Utility functions
} = require('gateway-addon');

const SSDPClient = require('node-ssdp').Client;


class RokuDevice extends Device {
    constructor(adapter, id, ip, port) {
        super(adapter, id);

        this.ip = ip;
        this.port = port;
        console.log('New Roku Created: ' + ip + ':' + port);

        this.adapter.handleDeviceAdded(this);
    }
}


class RokuAdapter extends Adapter {
    constructor(addonManager, manifest) {
        super(addonManager, 'roku-unknown', manifest.name);

        this.ssdpClient = new SSDPClient();
        this.ssdpClient.on('response', (headers, statusCode, rinfo) => {
            this.parseSSDPResponse(headers, statusCode, rinfo);
        });

        addonManager.addAdapter(this);
    }


    startPairing() {
        this.ssdpClient.search('roku:ecp');
    }

    addDevice(ip, port) {
        var id = 'roku' + ip;

        if(!this.devices[id]) {
            new RokuDevice(this, id, ip, port);
        }
    }

    parseSSDPResponse(headers, status, rinfo) {
        if(status == 200) {
            this.addDevice(rinfo.address, rinfo.port);
        }
    }
}


function LoadRokuAdapter(addonManager, manifest, errorCallback) {
    const adapter = new RokuAdapter(addonManager, manifest);
}


module.exports = LoadRokuAdapter;


/*
2018-04-26 19:51:21.805 roku: { 'CACHE-CONTROL': 'max-age=3600',
2018-04-26 19:51:21.806 roku:   ST: 'roku:ecp',
2018-04-26 19:51:21.806 roku:   USN: 'uuid:roku:ecp:YU00J2327631',
2018-04-26 19:51:21.806 roku:   EXT: '',
2018-04-26 19:51:21.806 roku:   SERVER: 'Roku UPnP/1.0 Roku/8.0.0',
2018-04-26 19:51:21.807 roku:   LOCATION: 'http://192.168.1.151:8060/',
2018-04-26 19:51:21.807 roku:   WAKEUP: 'MAC=b8:a1:75:f3:6d:5f;Timeout=10' }
2018-04-26 19:51:21.807 roku: 200
2018-04-26 19:51:21.807 roku: { address: '192.168.1.151',
2018-04-26 19:51:21.808 roku:   family: 'IPv4',
2018-04-26 19:51:21.808 roku:   port: 1900,
2018-04-26 19:51:21.808 roku:   size: 216 }
 */
