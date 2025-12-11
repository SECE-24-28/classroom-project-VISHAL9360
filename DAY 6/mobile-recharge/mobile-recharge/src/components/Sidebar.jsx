import React from "react";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <h2>Quick Access</h2>
      <ul>
        <li>Mobile Recharge</li>
        <li>DTH</li>
        <li>Data Packs</li>
        <li>History</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
