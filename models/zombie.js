var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Name: String,
    Mail: String, 
    Type: String
});

var Zombie = mongoose.model("Zombie", modelSchema);
module.exports = Zombie;