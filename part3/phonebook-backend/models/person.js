const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const url = process.env.MONGODB_URI;
console.log(`connecting to ${url}`);

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("successfully connected to MongoDB!");
  })
  .catch((error) => console.log("error connecting to MongoDB:", error.message));

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true,
  },
  number: {
    type: String,
    required: true,
    validate: {
      validator: (phoneNumber) => {
        // find all digits in the phone number
        const digitsArr = phoneNumber.match(/\d+/g);
        // if none found, return 0 and check whether > 8
        return (digitsArr ? digitsArr.join("").length : 0) >= 8;
      },
      message: (props) =>
        `${props.value} is not a valid phone number. A valid phone number must contain at least 8 digits.`,
    },
  },
});

// https://github.com/blakehaswell/mongoose-unique-validator#readme
personSchema.plugin(uniqueValidator);

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
