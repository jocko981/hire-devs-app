import { Routes, Route, BrowserRouter } from "react-router-dom";
// styles
import "./App.css";
// pages
import Dashboard from "./pages/dashboard/Dashboard";
import AddDeveloper from "./pages/addDeveloper/AddDeveloper";
import DeveloperProfile from "./pages/developerProfile/DeveloperProfile";
import EditDeveloper from "./pages/editDeveloper/EditDeveloper";
import Developers from "./pages/developers/Developers";
// components
import Sidebar from "./components/sidebar/Sidebar";
import Navbar from "./components/navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Sidebar />
        <div className="container">
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/developers" element={<Developers />} />
            <Route path="/add-developer" element={<AddDeveloper />} />
            <Route path="/developers/edit/:id" element={<EditDeveloper />} />
            <Route path="/developers/:id" element={<DeveloperProfile />} />
            <Route path="/new-hire-record" element={<h1>hire-record</h1>} />
            <Route path="/records/:id" element={<h1>record</h1>} />
            <Route path="*" element={<h1>Error page</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
