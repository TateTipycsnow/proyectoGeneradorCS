var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Description: String,
    Flavor: String, 
    Price: String,
    Picture: String
});

var Cerebro = mongoose.model("Cerebro", modelSchema);
module.exports = Cerebro;