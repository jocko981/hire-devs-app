import { Routes, Route, BrowserRouter } from "react-router-dom";
// styles
import "./App.css";
// pages
import Dashboard from "./pages/dashboard/Dashboard";
import CreateDeveloper from "./pages/createDeveloper/CreateDeveloper";
import DeveloperProfile from "./pages/developerProfile/DeveloperProfile";
import EditDeveloper from "./pages/editDeveloper/EditDeveloper";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        <div className="container">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create-developer" element={<CreateDeveloper />} />
            <Route path="/developers/edit/:id" element={<EditDeveloper />} />
            <Route path="/developers/:id" element={<DeveloperProfile />} />
            <Route path="/hire-record" element={<h1>hire-record</h1>} />
            <Route path="/records/:id" element={<h1>record</h1>} />
            <Route path="*" element={<h1>Error page</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
