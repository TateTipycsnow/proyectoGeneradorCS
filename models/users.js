var bcrypt = require('bcrypt');
var mongoose = require('mongoose');

var modelSchema = new mongoose.Schema({
    Username: {
        type: String,
        required: [true, "Escoja un nombre de usuario"],
    },
    Mail: {
        type: String,
        unique: [true, "Correo ya registrado"],
        required: [true, "Introduzca su correo"]
    },
    Rol: {
        type: String,
        enum: ["Administrador", "Normal"],
        required: [true, "Seleccione un rol"]
    },
    Image: {
        type: String,
        required: [true, "Seleccione una imagen de perfil"]
    },
    Password: {
        type: String,
        required: [true, "Introduzca una contraseña"]
    }
});

modelSchema.statics.hashPassword = function hashPassword(Password) {
    return bcrypt.hashSync(Password, 10);
};

modelSchema.methods.isValid = function isValid(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.Password);
};

module.exports = mongoose.model("Users", modelSchema);