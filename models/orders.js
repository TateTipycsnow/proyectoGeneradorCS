var mongoose = require('mongoose');

var modelSchema = mongoose.Schema({
    Seller: {
        type: String,
        required: [true, "Especificar vendedor"]
    },
    Flavor: {
        type: String,
        enum: ["Dubalin", "Minecraft", "Electrico", "Humano", "Repollo"]
    },
    Price: {
        type: Number,
        required: [true, "El precio es obligatorio"]
    },
    Date: {
        type: Date,
        required: [true, "Especificar fecha de entrega"]
    },
    Amount: {
        type: Number,
        required: [true, "Seleccionar la cantidad a comprar"]
    },
    UserId: {
        type: String,
        required: [true, "Introducir el id del usuario"]
    }
});

var Order = mongoose.model("Orders", modelSchema);
module.exports = Order;