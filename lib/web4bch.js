/*!
 * web3.js - Ethereum JavaScript API
 *
 * @license lgpl-3.0
 * @see https://github.com/ethereum/web3.js
*/

/*
 * This file is part of web3.js.
 *
 * web3.js is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * web3.js is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @file web3.js
 * @authors:
 *   Jeffrey Wilcke <jeff@ethdev.com>
 *   Marek Kotewicz <marek@ethdev.com>
 *   Marian Oancea <marian@ethdev.com>
 *   Fabian Vogelsteller <fabian@ethdev.com>
 *   Gav Wood <g@ethdev.com>
 * @date 2014
 */

var RequestManager = require('./web4bch/requestmanager');
var Iban = require('./web4bch/iban');
var Eth = require('./web4bch/methods/eth');
var Bch = require('./web4bch/methods/bch');
var DB = require('./web4bch/methods/db');
var Shh = require('./web4bch/methods/shh');
var Net = require('./web4bch/methods/net');
var Personal = require('./web4bch/methods/personal');
var Swarm = require('./web4bch/methods/swarm');
var Debug = require('./web4bch/methods/debug');
var Settings = require('./web4bch/settings');
var version = require('./version.json');
var utils = require('./utils/utils');
var sha3 = require('./utils/sha3');
var extend = require('./web4bch/extend');
var Batch = require('./web4bch/batch');
var Property = require('./web4bch/property');
var HttpProvider = require('./web4bch/httpprovider');
var IpcProvider = require('./web4bch/ipcprovider');
var BigNumber = require('bignumber.js');



function Web4Bch (provider) {
    this._requestManager = new RequestManager(provider);
    this.currentProvider = provider;
    this.eth = new Eth(this);
    this.bch = new Bch(this);
    this.db = new DB(this);
    this.shh = new Shh(this);
    this.net = new Net(this);
    this.personal = new Personal(this);
    this.debug = new Debug(this);
    this.bzz = new Swarm(this);
    this.settings = new Settings();
    this.version = {
        api: version.version
    };
    this.providers = {
        HttpProvider: HttpProvider,
        IpcProvider: IpcProvider
    };
    this._extend = extend(this);
    this._extend({
        properties: properties()
    });
}

// expose providers on the class
Web4Bch.providers = {
    HttpProvider: HttpProvider,
    IpcProvider: IpcProvider
};

Web4Bch.prototype.setProvider = function (provider) {
    this._requestManager.setProvider(provider);
    this.currentProvider = provider;
};

Web4Bch.prototype.reset = function (keepIsSyncing) {
    this._requestManager.reset(keepIsSyncing);
    this.settings = new Settings();
};

Web4Bch.prototype.BigNumber = BigNumber;
Web4Bch.prototype.toHex = utils.toHex;
Web4Bch.prototype.toAscii = utils.toAscii;
Web4Bch.prototype.toUtf8 = utils.toUtf8;
Web4Bch.prototype.fromAscii = utils.fromAscii;
Web4Bch.prototype.fromUtf8 = utils.fromUtf8;
Web4Bch.prototype.toDecimal = utils.toDecimal;
Web4Bch.prototype.fromDecimal = utils.fromDecimal;
Web4Bch.prototype.toBigNumber = utils.toBigNumber;
Web4Bch.prototype.toWei = utils.toWei;
Web4Bch.prototype.fromWei = utils.fromWei;
Web4Bch.prototype.isAddress = utils.isAddress;
Web4Bch.prototype.isChecksumAddress = utils.isChecksumAddress;
Web4Bch.prototype.toChecksumAddress = utils.toChecksumAddress;
Web4Bch.prototype.isIBAN = utils.isIBAN;
Web4Bch.prototype.padLeft = utils.padLeft;
Web4Bch.prototype.padRight = utils.padRight;


Web4Bch.prototype.sha3 = function(string, options) {
    return '0x' + sha3(string, options);
};

/**
 * Transforms direct icap to address
 */
Web4Bch.prototype.fromICAP = function (icap) {
    var iban = new Iban(icap);
    return iban.address();
};

var properties = function () {
    return [
        new Property({
            name: 'version.node',
            getter: 'web3_clientVersion'
        }),
        new Property({
            name: 'version.network',
            getter: 'net_version',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.ethereum',
            getter: 'eth_protocolVersion',
            inputFormatter: utils.toDecimal
        }),
        new Property({
            name: 'version.whisper',
            getter: 'shh_version',
            inputFormatter: utils.toDecimal
        })
    ];
};

Web4Bch.prototype.isConnected = function(){
    return (this.currentProvider && this.currentProvider.isConnected());
};

Web4Bch.prototype.createBatch = function () {
    return new Batch(this);
};

module.exports = Web4Bch;
