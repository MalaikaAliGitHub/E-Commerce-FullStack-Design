import React from 'react'
import Hero from '../components/Hero/Hero'
import Popular from '../components/Popular/Popular'
import Offers from '../components/Offers/Offers'
import NewCollections from '../components/NewCollections/NewCollections'
import NewsLetter from '../components/NewsLetter/NewsLetter'
import HomeSideBar from '../components/HomeSideBar/HomeSideBar'
import './CSS/Home.css'



const Home = () => {
 return (
    <div className='home-with-sidebar'>
      {/* Home Side bar */}
      <HomeSideBar/>

      <div className="home-content">
        <section id="hero"><Hero /></section>
        <section id="popular"><Popular /></section>
        <section id="offers"><Offers /></section>
        <section id="collections"><NewCollections /></section>
        <section id="newsletter"><NewsLetter /></section>
      </div>
    </div>
  );
}

export default Home
