import React from 'react'
import './HomeSideBar.css'
const HomeSideBar = () => {
  return (
    <div className="sidebar-scroll">
      <ul>
        <li><a href="#hero"> Hero</a></li>
        <li><a href="#popular"> Popular</a></li>
        <li><a href="#offers"> Offers</a></li>
        <li><a href="#collections">New Collections</a></li>
        <li><a href="#newsletter"> Newsletter</a></li>
      </ul>
    </div>
  );
}

export default HomeSideBar
