const mongoose = require("mongoose");

// definition du schema JSON
const ModuleSchema = new mongoose.Schema({
    id: {
        type: String,
        unique: true,
    },
    module_img: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description:
    {
        type: String,
        required: true
    },
    welcome:
    {
        type: String,
        required: true
    },
    subtitle:
    {
        type: String,
        required: true
    },
    presentation_gen:
    {
        type: String,
        required: true
    },
    presentation_spe:
    {
        type: String,
        
    },
    steps:
    {
        type: Array,
    }
});

module.exports = mongoose.model("Module", ModuleSchema);