import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminPanel = () => {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    name: "",
    description: "",
    price: "",
  });

  const fetchFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/foods");
      setFoods(response.data);
    } catch (error) {
      console.error("Error fetching foods:", error);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const handleAddFood = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/foods", newFood);
      console.log("Food added successfully:", response.data);
      setNewFood({
        name: "",
        description: "",
        price: "",
      });
      fetchFoods(); // Refresh the list of foods after adding a new one
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  const handleDeleteFood = async (foodId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/api/foods/${foodId}`);
      console.log("Food deleted successfully:", response.data);
      fetchFoods(); // Refresh the list of foods after deleting one
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <h3>Add New Food</h3>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={newFood.name}
          onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
        />
      </div>
      <div>
        <label>Description:</label>
        <input
          type="text"
          value={newFood.description}
          onChange={(e) => setNewFood({ ...newFood, description: e.target.value })}
        />
      </div>
      <div>
        <label>Price:</label>
        <input
          type="text"
          value={newFood.price}
          onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
        />
      </div>
      <button onClick={handleAddFood}>Add Food</button>

      <h3>Food List</h3>
      <ul>
        {foods.map((food) => (
          <li key={food._id}>
            {food.name} - {food.description} - ${food.price}
            <button onClick={() => handleDeleteFood(food._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPanel;