///////////////////////////////////////////////////
const express = require("express");
const router = express.Router();
const UserFoodSelection = require("../models/FoodSelection");
const AdminFoodSelection = require("../models/AdminFoodSelection");
const AvailableFood = require("../models/AvailableFood")
var date = new Date();

// get menu based on month and week number for admin
router.get("/getmenu", async (req, res) => {
  try {
    const { month, week, day } = req.query;
    console.log(`Month: ${month}, Week: ${week}: day: ${day}`);

    // Ensure that the provided day is valid (e.g., 'monday', 'tuesday', etc.)
    if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid day name' });
    }

    // Construct the query based on month, week, and day
    const query = {
      month,
      week,
      [`days.${day.toLowerCase()}.breakfast`]: { $exists: true },
      [`days.${day.toLowerCase()}.lunch`]: { $exists: true },
      [`days.${day.toLowerCase()}.dinner`]: { $exists: true }
    };

    console.log('Query:', query);

    // Find the document based on the constructed query
    const menu = await AvailableFood.findOne(query,
    //    {
    //   // [`days.${day.toLowerCase()}`]: 1
    // }
    );

    console.log('Menu Result:', menu);

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    return res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});




// put req to update and delete menu items from array
router.put('/update-meals', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { breakfast, lunch, dinner, deleteBreakfast, deleteLunch, deleteDinner } = req.body;
    console.log(`Query for finding the document: { "months.${month}.weeks.${week}.days.${day}"`);
    // Create an update object to set new values and/or delete elements
    const updateObj = {};

    // Handle additions
    if (breakfast && breakfast.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.breakfast`] = {
        $addToSet: { $each: breakfast },
      };
    }

    if (lunch && lunch.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.lunch`] = {
        $addToSet: { $each: lunch },
      };
    }

    if (dinner && dinner.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.dinner`] = {
        $addToSet: { $each: dinner },
      };
    }

    // Handle deletions
    if (deleteBreakfast && deleteBreakfast.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.breakfast`] = {
        $pull: { $in: deleteBreakfast },
      };
    }

    if (deleteLunch && deleteLunch.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.lunch`] = {
        $pull: { $in: deleteLunch },
      };
    }

    if (deleteDinner && deleteDinner.length > 0) {
      updateObj[`months.${month}.weeks.${week}.days.${day}.dinner`] = {
        $pull: { $in: deleteDinner },
      };
    }

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        [`months.${month}.weeks.${week}.days.${day}`]: { $exists: true },
      },
      {
        $set: updateObj,
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// update breakfast
router.put('/update-breakfast', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { breakfast } = req.body;

    // Ensure breakfast is an array
    const newBreakfast = Array.isArray(breakfast) ? breakfast : [breakfast];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.breakfast`]: { $exists: true },
      },
      {
        $addToSet: { [`days.${day}.breakfast`]: { $each: newBreakfast } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// update lunch
router.put('/update-lunch', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { lunch } = req.body;

    // Ensure lunch is an array
    const newLunch = Array.isArray(lunch) ? lunch : [lunch];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.lunch`]: { $exists: true },
      },
      {
        $addToSet: { [`days.${day}.lunch`]: { $each: newLunch } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// update dinner
router.put('/update-dinner', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { dinner } = req.body;

    // Ensure dinner is an array
    const newDinner = Array.isArray(dinner) ? dinner : [dinner];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.dinner`]: { $exists: true },
      },
      {
        $addToSet: { [`days.${day}.dinner`]: { $each: newDinner } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// delete breakfast
router.put('/delete-breakfast', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { deleteBreakfast } = req.body;

    // Ensure deleteBreakfast is an array
    const itemsToDelete = Array.isArray(deleteBreakfast) ? deleteBreakfast : [deleteBreakfast];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.breakfast`]: { $exists: true },
      },
      {
        $pull: { [`days.${day}.breakfast`]: { $in: itemsToDelete } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// delete lunch
router.put('/delete-lunch', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { deleteLunch } = req.body;

    // Ensure deleteLunch is an array
    const itemsToDelete = Array.isArray(deleteLunch) ? deleteLunch : [deleteLunch];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.lunch`]: { $exists: true },
      },
      {
        $pull: { [`days.${day}.lunch`]: { $in: itemsToDelete } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// delete dinner
router.put('/delete-dinner', async (req, res) => {
  try {
    const { month, week, day } = req.query;
    const { deleteDinner } = req.body;

    // Ensure deleteDinner is an array
    const itemsToDelete = Array.isArray(deleteDinner) ? deleteDinner : [deleteDinner];

    // Find and update the document for the specified month, week, and day
    const updatedFood = await AvailableFood.findOneAndUpdate(
      {
        month: month,
        week: week,
        [`days.${day}.dinner`]: { $exists: true },
      },
      {
        $pull: { [`days.${day}.dinner`]: { $in: itemsToDelete } },
      },
      { new: true }
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Day not found' });
    }

    return res.status(200).json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});



router.get("/menu",async (req,res)=>{
  try {
    const { day } = req.query;

    // Check if the 'day' parameter is provided and is valid
    if (!day || !['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day.toLowerCase())) {
      return res.status(400).json({ error: 'Invalid or missing day parameter' });
    }

    // Retrieve menu data for the selected day from the database
    const menuData = await AvailableFood.find({}, { [`days.${day}`]: 1 });

    // Respond with the retrieved data
    return res.status(200).json(menuData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})
// get all menu
router.get("/entiremenu",async(req,res)=>{
  try {
    const allFoodData = await AvailableFood.find();

    if (!allFoodData) {
      return res.status(404).json({ message: 'No food data found' });
    }

    // Combine data for all days into one object
    const entireWeekData = allFoodData.reduce((result, item) => {
      Object.keys(item.days).forEach((day) => {
        result[day] = {
          breakfast: item.days[day].breakfast,
          lunch: item.days[day].lunch,
          dinner: item.days[day].dinner,
        };
      });
      return result;
    }, {});

    return res.status(200).json(entireWeekData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
})





// another put req to update existing and adding new fields
router.put("/:day/:meal", async (req, res) => {
  const { day, meal } = req.params;
  const { items } = req.body;

  try {
    const updateQuery = { [`days.${day}.${meal}`]: items };

    const result = await AvailableFood.findOneAndUpdate(
      { "days": { [day]: { [meal]: { $exists: true } } } },
      { $set: updateQuery },
      { new: true, upsert: true }
    );

    if (!result) {
      return res.status(404).json({ message: "Food not found" });
    }

    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});






router.get("/ping",(req,res)=>{
  res.json({message:"hello"})
})

// update menu
router.put('/updateMenu', async (req, res) => {
  try {
    const { day, mealType, updatedData } = req.body;

    // Find the single document in the database (no need for query criteria)
    const menuToUpdate = await AvailableFood.findOne();

    if (!menuToUpdate) {
      return res.status(404).json({ message: 'Menu data not found' });
    }

    // Add the new value to the specified array (e.g., breakfast)
    menuToUpdate.days[day][mealType].push(updatedData);

    // Save the updated document to the database
    await menuToUpdate.save();

    return res.status(200).json({ message: 'Update successful' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Update failed' });
  }
});
router.post("/admin/createmenu",async(req,res)=>{
  try {
    const { month, menus,week } = req.body;

    // Find the document based on month and week
    let menu = await AvailableFood.findOne({ month,week });

    if (!menu) {
      // Create a new document if it doesn't exist
      menu = new AvailableFood({ month, week,  days: {} });
    }

    // Update the menu for all days
    menu.days = menus;

    // Save the updated menu
    await menu.save();

    return res.status(201).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get("/getFamusItemsObj", async (req, res) => {
  const MongoClient = require('mongodb').MongoClient;

  const uri = 'mongodb+srv://woxsenai:Ai%40l%40b2020@cluster0.yehbpjg.mongodb.net/';
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  let db; // Declare a variable to hold the database instance


  try {
    await client.connect();
    db = client.db('test'); // Replace with your database name
    console.log('Connected to database');
    const collection = db.collection('famus_items');
    const response  = await collection.findOne({});

    res.status(200).json({ response });
  } catch (error) {
    console.error("Error fetching FamusItems Object:", error);
    res.status(500).json({ message: "Server error" });
  }

});

// get menu based on month and week number for user
router.get("/user/getmenu", async (req, res) => {
  try {
    const { month, week } = req.query;
    console.log(`Month: ${month}, Week: ${week}`);

    // Ensure that the provided day is valid (e.g., 'monday', 'tuesday', etc.)
    // if (!['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day.toLowerCase())) {
    //   return res.status(400).json({ error: 'Invalid day name' });
    // }

    // Construct the query based on month, week, and day
    const query = {
      month,
      week,
      // [`days.${day.toLowerCase()}.breakfast`]: { $exists: true },
      // [`days.${day.toLowerCase()}.lunch`]: { $exists: true },
      // [`days.${day.toLowerCase()}.dinner`]: { $exists: true }
    };

    console.log('Query:', query);

    // Find the document based on the constructed query
    const menu = await AvailableFood.findOne(query,
    //    {
    //   // [`days.${day.toLowerCase()}`]: 1
    // }
    );

    console.log('Menu Result:', menu);

    if (!menu) {
      return res.status(404).json({ error: 'Menu not found' });
    }

    return res.status(200).json(menu);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});


// POST route to handle food selections
router.post("/store/usermenu", async (req, res) => {
  const { userId, selectedDay,selectedMonth,selectedWeek, breakfast, lunch, dinner } = req.body;
  const breakfastArray = {} 
  console.log(breakfastArray)
  const lunchArray = {}
  console.log(lunchArray)
  const DinnerArray = {}
  console.log(DinnerArray)
  try {
    // Create a new instance of the UserFoodSelection model with the user's food selection data
    const foodSelection = new UserFoodSelection({
      userId,
      selectedDay,
      selectedMonth,
      selectedWeek,
      breakfast,
      lunch,
      dinner,
    });

    const MongoClient = require('mongodb').MongoClient;

    const uri = 'mongodb+srv://woxsenai:Ai%40l%40b2020@cluster0.yehbpjg.mongodb.net/';
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    let db; // Declare a variable to hold the database instance

    async function connectToDatabase() {
    try {
        await client.connect();
        db = client.db('test'); // Replace with your database name
        console.log('Connected to database');
        const collection = db.collection('famus_items');
        let result = await collection.findOne({});
        currentDate = date.getFullYear()+ '/' + (date.getMonth() + 1)+ '/' + (date.getDate()-6)
        console.log(currentDate)
        if(currentDate < result[selectedDay].Date){
          saveArray();
        }
    } catch (err) {
        console.error('Error connecting to database', err);
    }
    }

    var day = date.getDay();
    var ulday = {sunday:"",monday:"",tuesday:"",wednesday:"",thursday:"",friday:"",saturday:""}
    var q = 0;
    var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday']
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
        await collection.updateOne(
              {},
              { $set: { [selectedDay]:{Date : ulday[selectedDay] , breakfast:{}, lunch:{}, Dinner:{} }} }
            );

        console.log('Array saved to database');
      } catch (err) {
        console.error('Error saving array', err);
      }
    }

    
    async function readAndValidateArray() {
      try {
        const collection = db.collection('famus_items');
        let result = await collection.findOne({});
          if (result && result[selectedDay]) {
            // const arrayFromDb_breakfast = seleted.breakfast;

            let modifiedArray = result[selectedDay]
            let i = 0
            let total_len = breakfast.length+1 + lunch.length+1 + dinner.length+1
            while(i < total_len){
              let m = 0
              while(m < breakfast.length){
                let result = modifiedArray.breakfast.hasOwnProperty(breakfast[m])
                if(result != true){
                  modifiedArray.breakfast[breakfast[m]] = 0
                };
                m = m+1
              };
              n = 0
              while(n < lunch.length){
                let result1 = modifiedArray.lunch.hasOwnProperty(lunch[n])
                if(result1 != true){
                  modifiedArray.lunch[lunch[n]] = 0
                };
                n = n+1
              };
              o = 0 
              while(o < dinner.length){
                let result2 = modifiedArray.Dinner.hasOwnProperty(dinner[o])
                if(result2 != true){
                  modifiedArray.Dinner[dinner[o]] = 0
                };
                o = o+1
              };
              
              if(breakfast[i] in modifiedArray.breakfast){
                modifiedArray.breakfast[breakfast[i]] = modifiedArray.breakfast[breakfast[i]]+1
                console.log("Breakfast Modified for :- ",breakfast[i])
              }
              if(lunch[i] in modifiedArray.lunch){
                modifiedArray.lunch[lunch[i]] = modifiedArray.lunch[lunch[i]]+1
                console.log("Lunch Modified for :- ",lunch[i])
              };
              if(dinner[i] in modifiedArray.Dinner){
                modifiedArray.Dinner[dinner[i]] ++
                console.log("Dinner Modified for :- ",dinner[i])
              };
              i++;
            };

            await collection.updateOne(
              {},
              { $set: { [selectedDay]: modifiedArray } }
            );
            var l = 0
    
            var famus_Items = []
            famus_Items.push(selectedDay)
            console.log(famus_Items)

          } else {
            console.log('Array not found in the database');
          }
      } catch (err) {
        console.error('Error reading and validating array', err);
      }
    }
    
    connectToDatabase()
      .then(() => {
      readAndValidateArray();
      })
      .catch(error => {
        console.error('Error connecting to database', error);
      });;
    
    // Save the food selection to the database
    await foodSelection.save();


    res.status(201).json({ message: "Food selection saved successfully" });
  } catch (error) {
    console.error("Error saving food selection:", error);
    res.status(500).json({ message: "Server error" });
  }
});




router.get("/userSelectedDays/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    console.log("Received userId:", userId);

    // Query the database to find all user selections with the matching userId
    const userSelections =  await UserFoodSelection.find({  userId });
    console.log("User selections:", userSelections);

    // Extract selected days from user selections
    const selectedDays = userSelections.map(selection => selection.selectedDay);

    console.log("Selected days:", selectedDays);

    res.status(200).json({ selectedDays });
  } catch (error) {
    console.error("Error fetching selected days:", error);
    res.status(500).json({ message: "Server error" });
  }

 
});



router.get("/userSelectedFood/:userId/:selectedMonth/:selectedWeek", async (req, res) => {
  try {
    const {userId,selectedMonth,selectedWeek} = req.params; 

    
    const foodSelections = await UserFoodSelection.find({ userId,selectedMonth,selectedWeek });

   
    const selectedFoodByDay = {};

    
    foodSelections.forEach((selection) => {
      const { selectedDay, breakfast, lunch, dinner } = selection;

      if (!selectedFoodByDay[selectedDay]) {
        selectedFoodByDay[selectedDay] = [];
      }

      selectedFoodByDay[selectedDay].push({
        breakfast,
        lunch,
        dinner,
      });
    });

   
    res.json(selectedFoodByDay);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/adminSelectedFood/:userId", async (req, res) => {
  try {
    debugger;
    const userId = req.params.userId; 

    console.log('USer id :::'+userId);
    console.log('AdminFoodSelection id :::'+AdminFoodSelection);
    const adminSelections = await AdminFoodSelection.find({ userId });
    console.log('adminSelections :::'+adminSelections.length);
    // const selectedFoodByDay = {};

    // // const new = [monday:[],]
    
    // adminSelections.forEach((selection) => {
    //   const { selectedDay, breakfast, lunch, dinner } = selection;

    //   if (!selectedFoodByDay[selectedDay]) {
    //     selectedFoodByDay[selectedDay] = [];
    //   }

    //   selectedFoodByDay[selectedDay].push(
    //     breakfast,
    //     lunch,
    //     dinner,
    //   );
    // });

    // console.log('selectedFoodByDay from DB :'+selectedFoodByDay.length);
    res.json(adminSelections);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});







module.exports = router;
