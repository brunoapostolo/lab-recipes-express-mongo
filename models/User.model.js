const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/* CAMPOS 
- name: String
- email: String
- favorites: [ObjectsId]
- dislikes: [ObjectsId]
*/

const clientSchema = new Schema({
  name: { type: String },
  email: { type: String, match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/ },
  favorites: [{ type: Schema.Types.ObjectId, ref: "RecipeModel" }],
  dislikes: [{ type: Schema.Types.ObjectId, ref: "RecipeModel" }],
});

const ClientModel = mongoose.model("ClientModel", clientSchema);

module.exports = ClientModel;
