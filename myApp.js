require('dotenv').config();

/** 1) Install & Set up mongoose */
let mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/** 2) Create a 'Person' Model */
let personSchema = new mongoose.Schema({
  name: {type: String, required: true},
  age: Number,
  favoriteFoods: [String]
})

/** 3) Create and Save a Person */
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => { 
  let RenataB = new Person({name: "Renata Barcelos", age: 35,     favoriteFoods: ['pizza', "sushi", "pasta"]});
  RenataB.save(function(err, data) {
  if (err) return console.error(err); 
  done(null, data)
});
};

/** 4) Create many People with `Model.create()` */
let arrayOfPeople = [
  {name: 'Erika', age: 20, favoriteFoods: ['veggies', "pineapple", "pasta"]}, 
  {name: 'James', age: 32, favoriteFoods: ["sushi", "broccoli", "taccos"]}, 
  {name: 'Anna', age: 22, favoriteFoods: ['egg sandwich', "pizza", "strawberry"]}
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
});
};

/** 5) Use `Model.find()` */
const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
}

/** 6) Use `Model.findOne()` */
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** 7) Use `Model.findById()` */
const findPersonById = (personId, done) => {
  Person.findById({_id: personId}, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** 8) Perform Classic Updates by Running Find, Edit, then Save */
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

 // .findById() method to find a person by _id
 Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
  // Array.push() method to add "hamburger" to the list of the person's favoriteFoods 
  person.favoriteFoods.push(foodToAdd);

   // and inside the find callback - save() the updated Person.
  person.save(function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
 })
};

/** 9) Perform New Updates on a Document */
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet},  { new: true }, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** 10) Delete One Document Using model.findByIdAndRemove */
const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** 11) Delete Many Documents with model.remove() */
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** 12) Chain Search Query Helpers */
const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person.find({favoriteFoods: foodToSearch}).sort({name: 1}).limit(2).select({ age: 0}).exec(function(err, data) {
  if (err) return console.error(err);
  done(null, data);
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
