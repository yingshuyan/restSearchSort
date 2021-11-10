const fs = require('fs');
const Papa = require('papaparse');
const cuisinesCSVPath = 'script/cuisines.csv';
const restaurantsCSVPath= 'script/restaurants.csv';

const {db,models:{Cuisine,Restaurant}} = require("../server/db")

//Function to exact data from cvs into variabels 
let cuisinesCSVList,restaurantsCSVList;

const readCSV = async (filePath,term) => {
  const csvFile = fs.readFileSync(filePath);
  const csvData = csvFile.toString();
   await Papa.parse(csvData, {
      header: true,
      complete: (results) => {
        console.log(`Complete extracting ${results.data.length} records from ${term}.csv`); 
        term==="cuisines"?cuisinesCSVList=results.data:restaurantsCSVList=results.data
      }
    });
};

readCSV(cuisinesCSVPath,"cuisines")
readCSV(restaurantsCSVPath,"restaurants")



async function seed() {
    await db.sync({ force: true }) // clears database
    console.log('db synced!')
    await Cuisine.bulkCreate(cuisinesCSVList)
    await Restaurant.bulkCreate(restaurantsCSVList)

}

async function runSeed() {
    console.log('seeding...')
    try {
      await seed()
    } catch (err) {
      console.error(err)
      process.exitCode = 1
    } finally {
      console.log('closing db connection')
      await db.close()
      console.log('db connection closed')
    }
  }
  
  if (module === require.main) {
    runSeed()
  }

