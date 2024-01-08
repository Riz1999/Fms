import React, { useState } from 'react'
import Header from "../Header" 
import Hero from "../Hero" 
import About from "../About" 
import FoodComponent from "../Food" 
import FoodSelectionPage from "../../FoodSelectionPage" 
import Subscription from "../Subscription" 
import Footer from "../Footer" 
const UserPage = () => {
    const [fetchData,setFetchData] = useState()
  return (
    <>
       <Header  />
          <Hero />
          <About />
          <FoodComponent setFetchData={setFetchData} />
          <FoodSelectionPage fetchData={fetchData}/>
          <Subscription />
          <Footer />
    </>
  )
}

export default UserPage
