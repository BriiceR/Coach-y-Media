const mongoose = require("mongoose");

const resultsSchema = new mongoose.Schema({
    id: {
        type: Number, // id de l'utilisateur
    required: true,
    },
    results: [
        {
          id: {
            type: String, // id de missing result
            required: true,
          },
          isValidModule: {
            type: [Boolean],
            required: true,
          }
        },
      ],
});

const Results = mongoose.model("Results", resultsSchema);

module.exports = Results;
