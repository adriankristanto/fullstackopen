require("dotenv").config();
const mongoose = require("mongoose");

// make sure the there are either 3 or 5 arguments
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log(
    "Please provide the password as an argument to list out all entries in the phonebook: node mongo.js <password>",
    "\nOptionally, provide the person's name and phone number as arguments to create a new entry to the phonebook: node mongo.js <password> <name> <number>"
  );
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://${process.env.MONGODB_USER}:${password}@${process.env.MONGODB_HOST}/${process.env.MONGODB_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
});

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 5) {
  const name = process.argv[3];
  const number = process.argv[4];

  const newPerson = new Person({
    name: name,
    number: number,
  });

  newPerson.save().then((result) => {
    console.log(`added ${name} number ${number} to phonebook`);
    mongoose.connection.close();
  });
} else {
  Person.find({}).then((result) => {
    console.log("phonebook:");
    result.forEach((person) => console.log(person.name, person.number));
    mongoose.connection.close();
  });
}
