var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Description: {
        type: String,
        required: [true, "La descripcion es obligatoria"]
    },
    Flavor: {
        type: String,
        enum: ["Dubalin", "Minecraft", "Electrico", "Humano", "Repollo"]
    },
    Price: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    Picture: {
        type: String,
        required: [true, "El nombre de la fotografia es obligatorio"]
    },
    UserId: {
        type: String,
        required: [true, "El id del usuario es necesario"]
    },
    User: {
        type: String,
        required: [true, "El usuario es necesario"]
    }
});

var Cerebro = mongoose.model("Cerebro", modelSchema);
module.exports = Cerebro;