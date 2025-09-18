import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import URL from "./constants/url";

import "./css/index.css";
import "./css/App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={URL.HOME} element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
