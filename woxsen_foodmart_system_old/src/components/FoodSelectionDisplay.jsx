// FoodSelectionDisplay.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./foodselectiondisplay.css"; // Import your CSS file

const FoodSelectionDisplay = ({fetchData}) => {
  const [selectedFood, setSelectedFood] = useState({});
  const userId = localStorage.getItem("userId");
  const calculateWeekNumber = (date) => {
    // Get the first day of the current month
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  
    // Find the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) for the first day of the month
    const firstDayOfWeek = firstDayOfMonth.getDay();
  
    // Calculate the week number by dividing the day of the month by 7 and rounding up
    const weekNumber = Math.ceil((date.getDate() + firstDayOfWeek) / 7);
    return weekNumber;
  };
  const date = new Date();
    const options = { month: 'long' };
    const selectedMonth = date.toLocaleString(undefined, options);
    
    // Get the week number based on the current date
    const selectedWeek = calculateWeekNumber(date);
    

  useEffect(() => {
    axios.get(`http://localhost:5000/foodselection/userSelectedFood/${userId}/${selectedMonth}/${selectedWeek}`)
      .then((response) => {
        setSelectedFood(response.data);
        console.log("response.data:  ",response.data)
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [userId,fetchData]);

  return (
    <section className="food-selection" id="food-selection">
      <h2>Selected Food for Each Day</h2>
      {Object.keys(selectedFood).length === 0 ? (
        <p>No data available</p>
      ) : (
        <table className="food-table">
          <thead>
            <tr>
              <th>Day</th>
              <th>Breakfast</th>
              <th>Lunch</th>
              <th>Dinner</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(selectedFood).map(([day, foodSelections]) => (
              <tr className="food-item" key={day}>
                <td className="day">{day.toUpperCase()}</td>
                {foodSelections.map((food, index) => (
              <>
                <td>{food.breakfast.join(', ')}</td>
                <td>{food.lunch.join(', ')}</td>
                <td>{food.dinner.join(', ')}</td>
                </> 
              
            ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default FoodSelectionDisplay;
