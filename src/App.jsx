import "./App.css";
import MainComponent from "./components/mainComponent.jsx";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import HistoryComponent from "./components/HistoryComponent.jsx";
function App() {
  return (
    <div className="w-full h-screen flex flex-col">
      <Navbar />
      <Routes>
        <Route path="/" element={<MainComponent />} />
        <Route path="/history" element={<HistoryComponent />} />
      </Routes>
    </div>
  );
}

export default App;
