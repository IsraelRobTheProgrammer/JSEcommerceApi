const { default: mongoose } = require("mongoose");
const JWT = require("jsonwebtoken");
const schema = mongoose.Schema;

const UserSchema = new schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// JWT FOR USER
UserSchema.methods.createJWT = function () {
  return JWT.sign(
    { userId: this._id, userType: this.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "1d",
    }
  );
};

module.exports = mongoose.model("User", UserSchema);
