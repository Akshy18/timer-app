import "./App.css";
import MainComponent from "./components/mainComponent.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HistoryComponent from "./components/HistoryComponent.jsx";
function App() {
  return (
    // Main container that takes full viewport height
    <div className="w-full h-screen flex flex-col">
      {/* Navigation bar that appears on all pages */}
      <Navbar />
      
      {/* Route configuration for the application */}
      <Routes>
        {/* Home page route - displays the MainComponent */}
        <Route path="/" element={<MainComponent />} />
        
        {/* History page route - displays the HistoryComponent */}
        <Route path="/history" element={<HistoryComponent />} />
      </Routes>
    </div>
  );
}

export default App;
