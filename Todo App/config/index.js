var configValues = require("./config");

module.exports = {

    getDbConnectionString: function() {
        return `mongodb://${configValues.uname}:${configValues.pwd}@ds127564.mlab.com:27564/nodetodo`;
    }

}