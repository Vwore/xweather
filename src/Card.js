import React from "react";
import './App.css'
export default function Card({ name, value }) {
  return (
    <div className="weather-card">
      <div>{name}</div>
      <div>{value}</div>
    </div>
  );
}
