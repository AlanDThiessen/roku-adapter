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


class RokuAdapter extends Adapter {
    constructor(addonManager, manifest) {
        super(addonManager, 'roku-unknown', manifest.name);

        addonManager.addAdapter(this);
    }
}


function LoadRokuAdapter(addonManager, manifest, errorCallback) {
    const adapter = new RokuAdapter(addonManager, manifest);
}


module.exports = LoadRokuAdapter;

