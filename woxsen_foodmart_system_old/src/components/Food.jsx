import React, { useState, useEffect } from "react";
import "./food.css";
import axios from "axios";

const FoodComponent = ({setFetchData}) => {

  const [ShowMenue, setShowMenue] = useState(true)
  const [ShowMonday, setShowMonday] = useState(false)
  const [ShowTuesday, setShowTueday] = useState(false)
  const [ShowWednesday, setShowWednesday] = useState(false)
  const [ShowThursday, setShowThursday] = useState(false)
  const [ShowFriday, setShowFriday] = useState(false)
  const [ShowSaturday, setShowSaturday] = useState(false)
  const [ShowSunday, setShowSunday] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({});
  const [savedMessage, setSavedMessage] = useState("");
  const [selectedDay, setSelectedDay] = useState("monday");
  const [selectedDays, setSelectedDays] = useState([]);
  const [AdminSelections, setAdminSelections] = useState([]);

  const [submitted, setSubmitted] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState("breakfast");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDay1, setSelectedDay1] = useState("");

  const [selectedBreakfastVarieties, setSelectedBreakfastVarieties] = useState(
    []
  );
  const [selectedLunchVarieties, setSelectedLunchVarieties] = useState([]);
  const [selectedDinnerVarieties, setSelectedDinnerVarieties] = useState([]);


  const calculateDateForDay = (day) => {
    const currentDate = new Date();
    const today = currentDate.getDay();
    const daysToAdd = day - today;
    currentDate.setDate(currentDate.getDate() + daysToAdd);
    return currentDate.toDateString();
  };

  const handleDayChange = (event) => {
    setSelectedDay(event.target.value);
    setSubmitted(false);
    setSelectedBreakfastVarieties([]);
    setSelectedLunchVarieties([]);
    setSelectedDinnerVarieties([]);
    setSelectedMeal("breakfast");
    const selectedDay1 = event.target.value;
    setSelectedDay1(selectedDay1);

    // Map the selected day to a numerical value (e.g., Sunday to 0, Monday to 1)
    const dayMap = {
      sunday: 0,
      monday: 1,
      tuesday: 2,
      wednesday: 3,
      thursday: 4,
      friday: 5,
      saturday: 6,
    };

    // Calculate the date based on the selected day
    const selectedDate = calculateDateForDay(dayMap[selectedDay1]);
    setSelectedDate(selectedDate);
  };

  const handleVarietyChange = (meal, variety,action) => {
    console.log("yes");
    switch (meal) {
      case "Breakfast Varieties":
        setSelectedBreakfastVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );
        console.log(selectedBreakfastVarieties);
        break;
      case "Lunch Varieties":
        if(action=='delete'){
          variety='';
          selectedLunchVarieties.splice(variety);
          setSelectedLunchVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.splice(variety)
            : [...prevSelectedVarieties, prevSelectedVarieties.splice(variety)]
          );
        

        }else{
        setSelectedLunchVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );
        }

        break;
      case "Dinner Varieties":
        console.log("dinner selected");
        setSelectedDinnerVarieties((prevSelectedVarieties) =>
          prevSelectedVarieties.includes(variety)
            ? prevSelectedVarieties.filter((v) => v !== variety)
            : [...prevSelectedVarieties, variety]
        );

        break;
      default:
        break;
    }
  };
  const userId = localStorage.getItem("userId");
  const callApi = (arg)=>{
    setFetchData(arg)
  }
  const handleFoodSelection = async () => {
    const date = new Date();
    const options = { month: 'long' };
    const selectedMonth = date.toLocaleString(undefined, options);
    
    // Get the week number based on the current date
    const selectedWeek = calculateWeekNumber(date);
    try {
      // Retrieve the user ID from local storage or state variable
      
      if (!userId) {
        // Handle the case where the user ID is missing
        console.error("User ID missing.");
        return;
      }
      console.log(selectedDays);
      if (selectedDays.includes(selectedDay)) {
        console.error("You have already selected food for this day.");
        return;
      }
      const data = {
        userId,
        selectedDay,
        selectedMonth,
        selectedWeek,
        breakfast: selectedBreakfastVarieties,
        lunch: selectedLunchVarieties,
        dinner: selectedDinnerVarieties,
      };

      console.log(data);

      const response = await axios.post(
        "https://24c5-49-249-163-201.ngrok-free.app/foodselection/store/usermenu",
        data
      );
      // consle.log(response)
      // setSelectedVarieties({});

      setSelectedDays((prevSelectedDays) => [...prevSelectedDays, selectedDay]);
      setSavedMessage(
        "Food saved successfully! Go to next day and select food"
      );
      callApi(true)
    } catch (error) {
      console.error("Error saving food selection:", error);
    }
    setSubmitted(true);
    
  };
  const [apiResponse,setApiResponse] = useState([])

  const getMealDescription = () => {
    const mealDescriptions = {
      monday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                
              ],
            },
          ],
        },
      },
      tuesday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                
              ],
            },
          ],
        },
      },
      wednesday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                
              ],
            },
          ],
        },
      },
      thursday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
               
              ],
            },
          ],
        },
      },
      friday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                
              ],
            },
          ],
        },
      },
      saturday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                
              ],
            },
          ],
        },
      },
      sunday: {
        breakfast: {
          description:
            "Boiled Eggs & Omelette,Bread/Jam/Butter,Tea/Coffee/Milk",

          meals: [
            // breakfast options...
            {
              name: "Breakfast Varieties",

              options: [
                
              ],
            },
          ],
        },
        lunch: {
          description: "Plain Rice, Chapathi, Green Salad",
          meals: [
            {
              name: "Lunch Varieties",

              options: [
                
              ],
            },
          ],
        },

        dinner: {
          description: "Plain Rice, Chapathi, Curd",
          meals: [
            {
              name: "Dinner Varieties",

              options: [
                {name:"Biryani"},
                {name:"Mandi"}
              ],
            },
          ],
        },
      },
    };
    for (const day in apiResponse.days) {
      if (mealDescriptions[day]) {
        // Iterate through meal types (breakfast, lunch, dinner)
        for (const mealType in apiResponse.days[day]) {
          // Find the corresponding meal in your mealDescriptions object
          const meal = mealDescriptions[day][mealType];
          
          // Check if the meal exists
          if (meal) {
            // Update the options array with the dish names from the API response
            meal.meals[0].options = apiResponse.days[day][mealType].map((dish) => ({
              name: dish,
            }));
          }
        }
      }
    }
    return mealDescriptions;
  };
  const mealDes = getMealDescription();
  const mealDescription = mealDes[selectedDay][selectedMeal]


  const getMealsForAdminFromDB = () => {
    const date = new Date();
    const options = { month: 'long' };
    const month = date.toLocaleString(undefined, options);
    
    // Get the week number based on the current date
    const weekNumber = calculateWeekNumber(date);
    console.log(`Month name: ${month} week number: ${weekNumber} and day is: ${selectedDay}`)
  
    axios
    .get(`https://24c5-49-249-163-201.ngrok-free.app/foodselection/user/getmenu?month=${month}&week=${weekNumber}`)
      .then((response) => {
        // Handle the response from the API call
        console.log('Response from DB: ',response.data);
        setApiResponse(response.data)
        const { breakfast, lunch, dinner } = response.data.days[selectedDay];

        console.log('Breakfast:', breakfast);
        // setBreakFastData(breakfast)
        console.log('Lunch:', lunch);
        // setLunchData(lunch)
        console.log('Dinner:', dinner);
        // setDinnerData(dinner)
        // console.log('Response for meal: ',response.data);
        
        // You can process the data returned from the API call here
      })
      .catch((error) => {
        console.error("Error fetching selected days:", error);
      });
  };
  
  const calculateWeekNumber = (date) => {
    // Get the first day of the current month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  
    // Find the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) for the first day of the month
    const firstDayOfWeek = firstDayOfMonth.getDay();
  
    // Calculate the week number by dividing the day of the month by 7 and rounding up
    const weekNumber = Math.ceil((date.getDate() + firstDayOfWeek) / 7);
    return weekNumber;
  };
  useEffect(() => {
    getMealsForAdminFromDB();
}, []);



const [selectedDayFood,setSelectedDayFood] = useState({})
  // const userId = localStorage.getItem("userId");
  const [showMenu,setShowMenu] = useState(false)

  useEffect(() => {
    const date = new Date();
    const options = { month: 'long' };
    const selectedMonth = date.toLocaleString(undefined, options);
    
    // Get the week number based on the current date
    const selectedWeek = calculateWeekNumber(date);
    axios.get(`https://24c5-49-249-163-201.ngrok-free.app/foodselection/userSelectedFood/${userId}/${selectedMonth}/${selectedWeek}`)
      .then((response) => {
        console.log("Selected Menu: ",response.data)
        console.log("Monday Menu: ",response.data?.monday)
        setSelectedDayFood(response.data);
        // debugger;
        const daysArr = ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']
        let count = 0
        const allDaysPresent = daysArr.every(day => response.data[day]);

        if (allDaysPresent) {
        setShowMenu(false);
      } else {
        setShowMenu(true);
      }
        while(count <= 6){

          console.log(ShowMenue)
          if(!response.data[daysArr[count]]){
            setSelectedDay(daysArr[count])
            if(count == 0){
              setShowMonday(true)
            }
            if(count == 1){
              setShowTueday(true)
            }
            if(count == 2){
              setShowWednesday(true)
            }
            if(count == 3){
              setShowThursday(true)
            }
            if(count == 4){
              setShowFriday(true)
            }
            if(count == 5){
              setShowSaturday(true)
            }
            if(count == 6){
              setShowSunday(true)
            }
          }
          if(ShowMonday == false && ShowTuesday == false &&ShowWednesday == false &&ShowThursday == false &&ShowFriday == false &&ShowSaturday == false &&ShowSunday == false) {
            setShowMenue(false)
          }else{
            setShowMenue(true)
          }
          count++
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId]);
  const isDayDisabled = (day) => {
    return Object.keys(selectedDayFood).includes(day);
  };

  return (
    <section id="food" className="food">
      <h2 className="head">Food Menu</h2>
    
      {/* <div className="selected-date">
        {selectedDate && <p>Selected Date: {selectedDate}</p>}
      </div> */}
      <div className="day-dropdown">
        <label htmlFor="day">Select a day:</label>
         {showMenu && <select
          id="day"
          name="day"
          value={selectedDay}
          onChange={handleDayChange}
        >
          {ShowMonday && (<option value="monday" disabled={isDayDisabled("monday")}>
            Monday
          </option>)}
          {ShowTuesday && (<option value="tuesday" disabled={isDayDisabled("tuesday")}>
            Tuesday
          </option>)}
          {ShowWednesday && (<option value="wednesday" disabled={isDayDisabled("wednesday")}>
            Wednesday
          </option>)}
          {ShowThursday && (<option value="thursday" disabled={isDayDisabled("thursday")}>
            Thursday
          </option>)}
          {ShowFriday && (<option value="friday" disabled={isDayDisabled("friday")}>
          Friday
          </option>)}
          {ShowSaturday && (<option value="saturday" disabled={isDayDisabled("saturday")}>
          Saturday
          </option>)}
          {ShowSunday && (<option value="sunday" disabled={isDayDisabled("sunday")}>
          Sunday
          </option>)}
          {/* Add options for other days */}
        </select> }

      </div>

      {showMenu ? <div className="food__buttons">
        <button
          className={selectedMeal === "breakfast" ? "active" : ""}
          onClick={() => setSelectedMeal("breakfast")}
        >
          Breakfast
        </button>
        <button
          className={selectedMeal === "lunch" ? "active" : ""}
          onClick={() => setSelectedMeal("lunch")}
        >
          Lunch
        </button>
        <button
          className={selectedMeal === "dinner" ? "active" : ""}
          onClick={() => setSelectedMeal("dinner")}
        >
          Dinner
        </button>
      </div> : <h4>Menu Already Selected</h4> }

      {submitted ? (
        <div className="success-message">
          <p>{savedMessage}</p>
        </div>
      ) : (
        
         showMenu && <div className="food-description">
          
          {selectedMeal === "breakfast" && (
            <div>
              {selectedDays.includes(selectedDay) ? (
                <p>Food is already selected for this day.</p>
              ) : (
                <>
                  <div className="meal-cards">
                    {mealDescription.meals.map((meal, index) => (
                      <div
                        className={`meal-card ${
                          selectedMeal === "breakfast" ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="meal-card__info">
                          <h4>{meal.name}</h4>

                          {/* Modify the condition to show buttons for all meals */}
                          {meal.options && meal.options.length > 0 && (
                            <div className="options-buttons">
                              <h5
                                style={{ color: "GrayText", marginBottom: "5px" }}
                              >
                                Choose among them
                              </h5>
                              {meal.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  className={`option-button ${
                                    selectedBreakfastVarieties.includes(option.name)
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() =>
                                    handleVarietyChange(meal.name, option.name,'')
                                  }
                                >
                                  {option.name}
                                </button>
                              


                              )
                              
                              )}
                            </div>
                          )}

                          {selectedMeal !== "breakfast" &&
                            (!meal.options || meal.options.length === 0) && (
                              <p>{meal.description}</p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="next" onClick={() => setSelectedMeal("lunch")}>
                    Next
                  </button>
                </>
              )}
            </div>
          )}

          {selectedMeal === "lunch" && (
            <div>
              <div className="meal-cards">
                {mealDescription.meals.map((meal, index) => (
                  <div
                    className={`meal-card ${
                      selectedMeal === "breakfast" ? "active" : ""
                    }`}
                    key={index}
                  >
                    <div className="meal-card__info">
                      <h4>{meal.name}</h4>

                      {/* Modify the condition to show buttons for all meals */}
                      {meal.options && meal.options.length > 0 && (
                        <div className="options-buttons">
                          <h5
                            style={{ color: "GrayText", marginBottom: "5px" }}
                          >
                            Choose among them
                          </h5>

                          
                              <br></br>
                          {meal.options.map((option, optionIndex) => (
                           
                            <button 
                              key={optionIndex}
                              className={`option-button ${selectedLunchVarieties.includes(option.name)
                                  ? "active"
                                  : ""}`}
                              onClick={() => handleVarietyChange(meal.name, option.name,'')}
                            >
                             {option.name}
                              
                                
                              
                             
                            </button>
                          ))}
                        </div>
                      )
                      
                      
                      }

                      {selectedMeal !== "breakfast" &&
                        (!meal.options || meal.options.length === 0) && (
                          <p>{meal.description}</p>
                        )}
                    </div>
                  </div>
                ))}
              </div>

              {/* ... (Existing lunch meal options code) */}
              <button
                className="next"
                onClick={() => setSelectedMeal("dinner")}
              >
                Next
              </button>
            </div>
          )}
         
           
              {selectedMeal === "dinner" && (
                <div>
                  <div className="meal-cards">
                    {mealDescription.meals.map((meal, index) => (
                      <div
                        className={`meal-card ${
                          selectedMeal === "breakfast" ? "active" : ""
                        }`}
                        key={index}
                      >
                        <div className="meal-card__info">
                          <h4>{meal.name}</h4>

                          {/* Modify the condition to show buttons for all meals */}
                          {meal.options && meal.options.length > 0 && (
                            <div className="options-buttons">
                              <h5
                                style={{
                                  color: "GrayText",
                                  marginBottom: "5px",
                                }}
                              >
                                Choose among them
                              </h5>
                              {meal.options.map((option, optionIndex) => (
                                <button
                                  key={optionIndex}
                                  className={`option-button ${
                                    selectedDinnerVarieties.includes(
                                      option.name
                                    )
                                      ? "active"
                                      : ""
                                  }`}
                                  onClick={() => {
                                    console.log(meal.name, option.name);
                                    console.log(selectedDinnerVarieties);
                                    handleVarietyChange(meal.name, option.name,'');
                                  }}
                                >
                                  {option.name}
                                </button>
                              ))}
                            </div>
                          )}

                          {selectedMeal !== "breakfast" &&
                            (!meal.options || meal.options.length === 0) && (
                              <p>{meal.description}</p>
                            )}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="submit" onClick={handleFoodSelection}>
                    Submit
                  </button>
                </div>
              )}
            
         
        </div>
      )}
    </section>
  );
};

export default FoodComponent;
