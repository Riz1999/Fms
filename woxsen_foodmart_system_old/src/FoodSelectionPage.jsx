// FoodSelectionPage.js

import React from "react";
import FoodSelectionDisplay from "./components/FoodSelectionDisplay";
import "./FoodSelectionPage.css"; // Import your CSS file

const FoodSelectionPage = ({fetchData}) => {
  return (
<div className="food-selection-page">
      <header className="food-selection-header">
        <h4>Student Food Selection</h4>
        <p>Plan your meals for the week</p>
      </header>

      <main className="food-list">
        <FoodSelectionDisplay fetchData={fetchData} />
      </main>

      <section className="tips-section">
        <h4>Student Tips</h4>
        <div className="tips-container">
          <div className="tip">
            <h3>Stay Healthy</h3>
            <p>Eat balanced meals and exercise regularly.</p>
          </div>
          <div className="tip">
            <h3>Save Money</h3>
            <p>Explore student discounts and budget-friendly recipes.</p>
          </div>
          <div className="tip">
            <h3>Time Management</h3>
            <p>Plan your meals efficiently to focus on your studies.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FoodSelectionPage;
