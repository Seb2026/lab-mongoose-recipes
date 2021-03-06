const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any documents to the database, let's delete all previous entries
    return self.connection.dropDatabase();
  })
  .then(() => {
    Recipe.create({
      title: `Sebas's recipe`,
      level: `Easy Peasy`,
      ingredients: [`Bread`, `Cheese`],
      cuisine: `colombian`,
      dishType: `snack`,
      image: ``,
      duration: 30,
      creator: `Sebastian`,
      created: ``
    })
    .then(newRecipe => {
      console.log(`new recipe created by ${newRecipe.title}`)
    })
    .catch(error => {
      console.log(`error creating website ${error}`)
    })
    // Run your code here, after you have insured that the connection was made
  })
  Recipe.insertMany(data)
  .then(dataResult => {
    dataResult.forEach((eachData) => {
      console.log(`New recipe added by ${eachData.title}`);
    });
  })
  .catch(error => {
    console.log(`error adding recipe ${error}`);
  })
  Recipe.findOneAndUpdate({title: `Rigatoni alla Genovese`}, {duration: 100})
  .then(updated => {
    console.log(`Success in updating duration to ${updated}`);
  })
  .catch(err => {
    console.log(`error updating duration due to ${error}`);
  })
  Recipe.deleteOne({title: `Carrot Cake`})
  .then(removed => {
    console.log(`successfully removed ${removed}!`)
  })
  .catch(notremoved => {
    console.log(`error removing due to ${notremoved}!`)
  })

  
  .catch(error => {
    console.error('Error connecting to the database', error);
  });

  mongoose.connection.close();


