var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Name: {
        type: String,
        required: [true, "El nombre es obligatorio"],
        minlength: [3, "El nombre es muy corto"],
        maxlength: [20, "El nombre es muy largo"]
    },
    Mail: {
        type: String,
        required: [true, "El e-mail es obligatorio"]
    },
    Type: {
        type: String,
        enum: ["Alumno", "Maestro", "Creator", "Drawer", "Fighter"]
    },
    UserId: {
        type: String,
        required: [true, "El usuario es necesario"]
    }
});

var Zombie = mongoose.model("Zombie", modelSchema);
module.exports = Zombie;