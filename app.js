const isOnline = require('is-online');
const app = require('./index');

isOnline().then(online => {
    if (online) {
        app.initialize();
    } else {
        console.log("No Internet Connection!");
    }
});