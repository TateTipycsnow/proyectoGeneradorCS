var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Description: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    Flavor: {
        type: String,
        enum: ["Fresa", "Vainilla", "Platano", "Higo", "Sandia"]
    },
    Price: {
        type: String,
        required: [true, "El precio es obligatorio"]
    },
    Picture: {
        type: String,
        required: [true, "El nombre de la fotografia es obligatorio"]
    }
});

var Cerebro = mongoose.model("Cerebro", modelSchema);
module.exports = Cerebro;