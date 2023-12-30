const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    username: { type: String, required: true, unique },
    email: { type: String, required: true, unique },
    password: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
