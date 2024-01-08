// import React, { useState } from 'react';
// import "./MenuForm.css"
// import axios from 'axios';
// function MenuForm() {
//   const [formData, setFormData] = useState({
//     month: '',
//     week: '',
//     menus: {
//       monday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       tuesday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       wednesday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       thursday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       friday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       saturday: {
//         breakfast: [],
//         lunch: [],
//         dinner: [],
//       },
//       // Add similar structures for other days of the week
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleItemChange = (day, mealType, index, e) => {
//     const { value } = e.target;
//     const updatedMenus = { ...formData.menus };
//     updatedMenus[day][mealType][index] = value;
//     setFormData({ ...formData, menus: updatedMenus });
//   };

//   const handleAddItem = (day, mealType) => {
//     const updatedMenus = { ...formData.menus };
//     updatedMenus[day][mealType].push('');
//     setFormData({ ...formData, menus: updatedMenus });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log(formData);
//     try {
//         const response = await axios.post("http://localhost:5000/foodselection/admin/createmenu", formData);
//         console.log("Response from API:", response.data);
//       } catch (error) {
//         console.error("Error while sending data to API:", error);
//       }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <label>
//         Month:
//         <input
//           type="text"
//           name="month"
//           value={formData.month}
//           onChange={handleChange}
//         />
//       </label>
//       {/* Create input fields for each day */}
//       {Object.keys(formData.menus).map((day) => (
//         <div key={day}>
//           <h3 style={{textTransform:"uppercase",borderBottom:"2px solid black"}}>{day}</h3>
//           {Object.keys(formData.menus[day]).map((mealType) => (
//             <div key={mealType}>
//               <h4 >{mealType}</h4>
//               {formData.menus[day][mealType].map((item, index) => (
//                 <div key={index}>
//                   <input
//                     type="text"
//                     value={item}
//                     onChange={(e) =>
//                       handleItemChange(day, mealType, index, e)
//                     }
//                   />
//                 </div>
//               ))}
//               <button
//                 type="button"
//                 onClick={() => handleAddItem(day, mealType)}
//               >
//                 Add Item
//               </button>
//             </div>
//           ))}
//         </div>
//       ))}
//         <br />
//       <button type="submit">Submit</button>
//         <br />
//     </form>
//   );
// }

// export default MenuForm;

import React, { useState } from "react";
import "./MenuForm.css";
import axios from "axios";

function MenuForm() {
  const [formData, setFormData] = useState({
    month: "",
    week: "",
    month: "",
    week: "",
    menus: {
      monday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      tuesday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      wednesday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      thursday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      friday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      saturday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
      sunday: {
        breakfast: [],
        lunch: [],
        dinner: [],
      },
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleItemChange = (day, mealType, index, e) => {
    const { value } = e.target;
    const updatedMenus = { ...formData.menus };
    updatedMenus[day][mealType][index] = value;
    setFormData({ ...formData, menus: updatedMenus });
  };

  const handleAddItem = (day, mealType) => {
    const updatedMenus = { ...formData.menus };
    updatedMenus[day][mealType].push("");
    setFormData({ ...formData, menus: updatedMenus });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      const response = await axios.post(
        "http://localhost:5000/foodselection/admin/createmenu",
        {
          month: formData.month,
          week: formData.week,
          menus: formData.menus,
        }
      );

      console.log("Response from API:", response.data);
      setFormData({
        month: "",
        week: 0,
        month: "",
        week: "",
        menus: {
          monday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          tuesday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          wednesday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          thursday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          friday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          saturday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
          sunday: {
            breakfast: [],
            lunch: [],
            dinner: [],
          },
        },
      });
    } catch (error) {
      console.error("Error while sending data to API:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Month:
        <select
          name="month"
          value={formData.month}
          onChange={handleChange}
          className="select"
        >
          <option value="">Select a month</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </label>
      <label>
        Week:
        <select name="week" value={formData.week} onChange={handleChange}>
          <option value="">Select a week</option>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
          <option value={5}>Week 5</option>
        </select>
      </label>
      {/* Create input fields for each day */}
      {Object.keys(formData.menus).map((day) => (
        <div key={day}>
          <h3
            style={{
              textTransform: "uppercase",
              borderBottom: "2px solid black",
            }}
          >
            {day}
          </h3>
          {Object.keys(formData.menus[day]).map((mealType) => (
            <div key={mealType}>
              <h4>{mealType}</h4>
              {formData.menus[day][mealType].map((item, index) => (
                <div key={index}>
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => handleItemChange(day, mealType, index, e)}
                  />
                </div>
              ))}
              <button
                className="btn"
                type="button"
                onClick={() => handleAddItem(day, mealType)}
              >
                Add Item
              </button>
            </div>
          ))}
        </div>
      ))}
      <br />
      <button className="btn-sub" type="submit">
        Submit
      </button>
      <br />
    </form>
  );
}

export default MenuForm;
