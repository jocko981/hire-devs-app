import { Routes, Route, BrowserRouter } from "react-router-dom";
// styles
import "./App.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        {/* <Sidebar /> */}
        <div className="container">
          {/* <Navbar /> */}
          <Routes>
            <Route path="/" element={<h1>Dashboard</h1>} />
            <Route path="/create-developer" element={<h1>create profile</h1>} />
            <Route path="/developers/:id" element={<h1>developers profile</h1>} />
            <Route path="/hire-record" element={<h1>create profile</h1>} />
            <Route path="/records/:id" element={<h1>project</h1>} />
            <Route path="*" element={<h1>Error page</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
