import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FetchMenuAdmin.css";

const FetchMenuAdmin = () => {
  const [month, setMonth] = useState("");
  const [week, setWeek] = useState("");
  const [day, setDay] = useState("");
  const [menu, setMenu] = useState(null);
  const [newBreakfastItem, setNewBreakfastItem] = useState("");
  const [newLunchItem, setNewLunchItem] = useState("");
  const [newDinnerItem, setNewDinnerItem] = useState("");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const weekNumbers = [1, 2, 3, 4, 5];

  const dayNames = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/getmenu?month=${month}&week=${week}&day=${day}`
      );
      setMenu(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  useEffect(() => {
    if (month && week && day) {
      fetchData();
    }
  }, [month, week, day]);

  // store breakfast item
  const storeBreakFast = async () => {
    try {
      let dayOfTheWeek = day.toLocaleLowerCase();
      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/update-breakfast?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          breakfast: [newBreakfastItem],
        }
      );
      console.log("add new Breakfast Response", response.data);
      setMenu(response.data);
      setNewBreakfastItem("");
    } catch (error) {
      console.error(`Error Storing ${newBreakfastItem}: `, error);
    }
  };

  // store lunch
  const storeLunch = async () => {
    try {
      let dayOfTheWeek = day.toLocaleLowerCase();
      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/update-lunch?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          lunch: [newLunchItem],
        }
      );
      console.log("add new Lunch Response", response.data);
      setMenu(response.data);
      setNewLunchItem("");
    } catch (error) {
      console.error(`Error Storing ${newLunchItem}: `, error);
    }
  };

  // store dinner
  const storeDinner = async () => {
    try {
      let dayOfTheWeek = day.toLocaleLowerCase();
      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/update-dinner?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          dinner: [newDinnerItem],
        }
      );
      console.log("add new dinner Response", response.data);
      setMenu(response.data);
      setNewDinnerItem("");
    } catch (error) {
      console.error(`Error Storing ${newDinnerItem}: `, error);
    }
  };

  //   deleting items from db
  const deleteBreakfast = async (itemName) => {
    try {
      console.log("testttttttttttt", month, week, day.toLocaleLowerCase());
      let dayOfTheWeek = day.toLocaleLowerCase();
      if (!month || !week || !day) {
        console.error("Month, week, or day is not selected.");
        return;
      }

      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/delete-breakfast?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          deleteBreakfast: [itemName],
        }
      );
      console.log("Delete Response", response.data);
      setMenu(response.data);
    } catch (error) {
      console.error(`Error deleting ${itemName}: `, error);
    }
  };

  // delete lunch
  const deleteLunch = async (itemName) => {
    try {
      console.log("testttttttttttt", month, week, day.toLocaleLowerCase());
      let dayOfTheWeek = day.toLocaleLowerCase();
      if (!month || !week || !day) {
        console.error("Month, week, or day is not selected.");
        return;
      }

      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/delete-lunch?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          deleteLunch: [itemName],
        }
      );
      console.log("Delete Response", response.data);
      setMenu(response.data);
    } catch (error) {
      console.error(`Error deleting ${itemName}: `, error);
    }
  };

  // delete dinner
  const deleteDinner = async (itemName) => {
    try {
      console.log("testttttttttttt", month, week, day.toLocaleLowerCase());
      let dayOfTheWeek = day.toLocaleLowerCase();
      if (!month || !week || !day) {
        console.error("Month, week, or day is not selected.");
        return;
      }

      const response = await axios.put(
        `https://24c5-49-249-163-201.ngrok-free.app/foodselection/delete-dinner?month=${month}&week=${week}&day=${dayOfTheWeek}`,
        {
          deleteDinner: [itemName],
        }
      );
      console.log("Delete Response", response.data);
      setMenu(response.data);
    } catch (error) {
      console.error(`Error deleting ${itemName}: `, error);
    }
  };

  return (
    <div className="menu-selector">
      <h2 className="menu-selector-h2">Menu Selector</h2>
      <div className="menu-form">
        <label>Month:</label>
        <select
          className="admin-select"
          onChange={(e) => setMonth(e.target.value)}
        >
          <option value="">Select a month</option>
          {months.map((m, index) => (
            <option key={index} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Week:</label>
        <select onChange={(e) => setWeek(e.target.value)}>
          <option value="">Select a week</option>
          {weekNumbers.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Day:</label>
        <select onChange={(e) => setDay(e.target.value.toLocaleLowerCase())}>
          <option value="">Select a day</option>
          {dayNames.map((d, index) => (
            <option key={index} value={d}>
              {d}
            </option>
          ))}
        </select>
      </div>
      {menu && (
        <div className="menu-preview">
          <h3>
            Menu for {day} in {month}, Week {week}:
          </h3>
          <div className="meal-section">
            <strong className="strong">Breakfast:</strong>
            {menu?.days[day.toLowerCase()]?.breakfast.length > 0 ? (
              <div className="del-din">
                {menu?.days[day.toLowerCase()]?.breakfast.map((item, index) => (
                  <div className="del" key={index}>
                    {item}
                    <button
                      className="btn-del"
                      onClick={() => deleteBreakfast(item)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p">No breakfast items found.</p>
            )}
            <input
              type="text"
              placeholder="add new Item"
              value={newBreakfastItem}
              onChange={(e) => setNewBreakfastItem(e.target.value)}
            />
            <button className="btn" onClick={() => storeBreakFast()}>
              Add
            </button>
          </div>
          <div className="meal-section">
            <strong className="strong">Lunch:</strong>
            {menu?.days[day.toLowerCase()]?.lunch.length > 0 ? (
              <div className="del-din">
                {menu?.days[day.toLowerCase()]?.lunch.map((item, index) => (
                  <div className="del" key={index}>
                    {item}
                    <button
                      className="btn-del"
                      onClick={() => deleteLunch(item)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p">No lunch items found.</p>
            )}
            <input
              type="text"
              placeholder="add new Item"
              value={newLunchItem}
              onChange={(e) => setNewLunchItem(e.target.value)}
            />
            <button className="btn" onClick={() => storeLunch()}>
              Add
            </button>
          </div>
          <div className="meal-section">
            <strong className="strong">Dinner:</strong>
            {menu?.days[day.toLowerCase()]?.dinner.length > 0 ? (
              <div className="del-din">
                {menu?.days[day.toLowerCase()]?.dinner.map((item, index) => (
                  <div className="del" key={index}>
                    {item}
                    <button
                      className="btn-del"
                      onClick={() => deleteDinner(item)}
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="p">No dinner items found.</p>
            )}
            <input
              type="text"
              placeholder="add new Item"
              value={newDinnerItem}
              onChange={(e) => setNewDinnerItem(e.target.value)}
            />
            <button className="btn" onClick={() => storeDinner()}>
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FetchMenuAdmin;
