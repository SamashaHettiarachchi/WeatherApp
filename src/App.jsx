import React from "react";
import "./index.css"; // Ensure the CSS file is imported
import backgroundImage from "./StockCake-Sunny Daisy Field_1727080206.jpg";
import Weather from "./components/Weatherr";

const App = () => {
  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        height: "100vh", // Full viewport height
        backgroundSize: "cover", // Scale the image to cover the div
        backgroundPosition: "center", // Center the image
      }}
    >
      {/* Add your content here */}
      <Weather />
    </div>
  );
};

export default App;
