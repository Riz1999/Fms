// const fs = require('fs');
// const MongoClient = require('mongodb').MongoClient;
// const ExcelJS = require('exceljs');

// // MongoDB connection URL
// const mongoUrl = 'mongodb+srv://sonalisadana1:sonalisadana@cluster0.ea2yqup.mongodb.net/?retryWrites=true&w=majority';
// const dbName = 'test';

// // Create a new workbook and worksheet
// const workbook = new ExcelJS.Workbook();
// const worksheet = workbook.addWorksheet('UserFoodData');

// // Connect to MongoDB and fetch data from collections
// (async () => {
//   const client = new MongoClient(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

//   try {
//     await client.connect();
//     console.log('Connected to MongoDB');

//     const db = client.db(dbName);

//     // Fetch data from collections
//     const users = await db.collection('users').find().toArray();
//     const foodSelected = await db.collection('userfoodselections').find().toArray();


//     // Combine user and food data
//     const combinedData = users.map(user => {
//       const selectedFood = foodSelected.find(userfoodselection => userfoodselection.userId === user._id);
//       const breakfast = foodSelected
//         .map(userfoodselection => userfoodselection.breakfast)
//       const lunch = foodSelected.map(userfoodselection => userfoodselection.lunch)
//       const dinner = foodSelected.map(userfoodselection => userfoodselection.dinner)

//       if (breakfast === 'Idly/Wada') {
//         breakfast_item.IdlyWada = +1
//       };

//       return {
//         username: user.name,
//         userEmail: user.email,
//         breakfast: selectedFood ? selectedFood.breakfast : breakfast,
//         lunch: selectedFood ? selectedFood.lunch : lunch,
//         dinner: selectedFood ? selectedFood.dinner : dinner
//       };
//     });

//     // Add headers to the worksheet
//     worksheet.addRow(['Username', "UserEmail" ,'Breakfast', 'lunch', 'dinner']);

//     // Add data to the worksheet
//     combinedData.forEach(data => {
//       worksheet.addRow([data.username, data.userEmail, data.breakfast, data.lunch, data.dinner]);
//     });

//     // Save the workbook as a CSV file
//     const csvFilePath = 'user_food_data.csv';
//     await workbook.xlsx.writeFile(csvFilePath);
//     console.log(`CSV file "${csvFilePath}" generated successfully.`);
//   } catch (err) {
//     console.error('Error:', err);
//   } finally {
//     // Close the MongoDB connection
//     client.close();
//   }
// })();
// const MongoClient = require('mongodb').MongoClient;

// const uri = 'mongodb+srv://sonalisadana1:sonalisadana@cluster0.ea2yqup.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB URI
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// async function getDataFromMongo() {
//     try {
//         await client.connect();
//         const database = client.db('test'); // Replace with your database name
//         const usersCollection = database.collection('users');
//         const foodCollection = database.collection('userfoodselections');

//         const users = await usersCollection.find().toArray();
//         const foodSelections = await foodCollection.find().toArray();

//         return { users, foodSelections };
//     } catch (err) {
//         console.error('Error connecting to MongoDB:', err);
//     } finally {
//         await client.close();
//     }
// }

// const fs = require('fs');
// const ExcelJS = require('exceljs');

// function generateCSV(users, foodSelections) {
//     const workbook = new ExcelJS.Workbook();
//     const worksheet = workbook.addWorksheet('Sheet1');
    
//     // Add header row
//     worksheet.addRow(['User ID', 'Username', 'UserEmail', 'breakfast', 'lunch', 'dinner']);
    
//     // Add data rows
//     users.forEach(user => {
//         const breakfast = foodSelections
//             //.filter(userfoodselection => userfoodselection.userId === user._id)
//             .map(userfoodselection => userfoodselection.breakfast)
//             .join(', ');
//         const lunch = foodSelections
//             //.filter(userfoodselection => userfoodselection.userId === user._id)
//             .map(userfoodselection => userfoodselection.lunch)
//             .join(', ');
//         const dinner = foodSelections
//             //.filter(userfoodselection => userfoodselection.userId === user._id)
//             .map(userfoodselection => userfoodselection.dinner)
//             .join(', ');
        
//         worksheet.addRow([user._id, user.name, user.email, breakfast, lunch, dinner]);
//     });
    
//     // Save the workbook to a file
//     const csvFilePath = 'user_food_selections.csv';
//     workbook.xlsx.writeFile(csvFilePath)
//         .then(() => {
//             console.log(`CSV file saved at: ${csvFilePath}`);
//         })
//         .catch(err => {
//             console.error('Error saving CSV file:', err);
//         });
// }

// getDataFromMongo().then(({ users, foodSelections }) => {
//     generateCSV(users, foodSelections);
// });

var date = new Date();

var only_date = date.getDate();



console.log(date)

const MongoClient = require('mongodb').MongoClient;

    const uri = 'mongodb+srv://woxsenai:Ai%40l%40b2020@cluster0.yehbpjg.mongodb.net/';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let db; // Declare a variable to hold the database instance

    async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('test'); // Replace with your database name
        console.log('Connected to database');
    } catch (err) {
        console.error('Error connecting to database', err);
    }
    }
    var day = date.getDay();
    var ulday = {sun:"",mon:"",tue:"",wed:"",thu:"",fri:"",sat:""}
    var q = 0;
    var days = ['sun','mon','tue','wed','thu','fri','sat']
    while(q <= 6){
      if(q == 0){
        var Datetoincri = 7 - day
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate()+Datetoincri)
      }else if(day == q) {
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate())

      }else if(q < day){
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate() - (day-q))
      }else{
        ulday[days[q]] = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate() + (q-day))  
      }
      q++
    };
    console.log(ulday,day)


    async function saveArray() {
      try {
        const collection = db.collection('famus_items');
        await collection.insertOne({
          monday:{
            Date: ulday.mon,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          tuesday:{
            Date: ulday.tue,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          wednesday:{
            Date: ulday.wed,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          thursday:{
            Date: ulday.thu,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          friday:{
            Date: ulday.fri,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          saturday:{
            Date: ulday.sat,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          },
          sunday:{
            Date: ulday.sun,
            breakfast : {},
            lunch: {},  
            Dinner : {},
          }
        });

        console.log('Array saved to database');
      } catch (err) {
        console.error('Error saving array', err);
      }
    }

    connectToDatabase()
      .then(() => {
      saveArray()
      })
      .catch(error => {
        console.error('Error connecting to database', error);
      });;