/* jshint ignore:start */


// Browser environment
if(typeof window !== 'undefined') {
    Web4Bch = (typeof window.Web4Bch !== 'undefined') ? window.Web4Bch : require('web4bch');
    BigNumber = (typeof window.BigNumber !== 'undefined') ? window.BigNumber : require('bignumber.js');
}


// Node environment
if(typeof global !== 'undefined') {
    Web4Bch = (typeof global.Web4Bch !== 'undefined') ? global.Web4Bch : require('web4bch');
    BigNumber = (typeof global.BigNumber !== 'undefined') ? global.BigNumber : require('bignumber.js');
}

/* jshint ignore:end */
