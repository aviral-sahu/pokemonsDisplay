import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentDetails from "./Components/Content";
import Pokemon from "./Components/Pokemon";
import "./Styles/style.css";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pokemon />} />
          <Route
            path="/details/:id"
            element={<ContentDetails animate={true} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
