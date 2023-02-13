require('dotenv').config();
let mongoose = require('mongoose');
let validator = require('validator')

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  });
let personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});
let Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {

  let newPerson = new Person({
    name: "Tejash-1",
    age: 24,
    favoriteFoods: ["apples"]
  })
  newPerson.save(function (err, data) {
    if (err) { return console.log("Error" + err) };
    done(null, data);
  });
};

const createManyPeople = (arrayOfPeople, done) => {
  console.log("createManyPeople: add " + arrayOfPeople)
  Person.create(arrayOfPeople, function(err, data){
    if(err){return console.log(err)};
    done(null, data);
  })
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data){
    if(err){return console.log(err)}
    done(null, data)
  })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, function(err, data){
    if(err){return console.log(err)}
    done(null, data)
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data){
    if(err){return console.log(err)}
    done(null, data)
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById(personId, function(err, data){
    data.favoriteFoods.push(foodToAdd)
    data.save(function(err, newData){
      if(err){return console.log(err)}
      done(null, newData)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  //query, update, option(s), callback
  Person.findOneAndUpdate({ name: personName },{ age: ageToSet },{ new: true },function(err, person){
    if(err){return console.log(err)}
    done(null, person)
  })
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, data){
    if(err){return console.log(err)}
    done(null, data)
  })
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({ name: nameToRemove }, function(err, data){
    if(err){return console.log(err)}
    done(null, data)
  })
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
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
