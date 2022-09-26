import { useEffect, useState } from "react";
import MapComponent from "./components/MapComponent";
import Navbar from "./components/Navbar";
import Tables from "./components/Tables";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [dataCollection, setDataCollection] = useState();

  useEffect(() => {
    fetch("https://plovput.li-st.net/getObjekti/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setDataCollection(data);
      });
  }, []);

  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={<MapComponent dataCollection={dataCollection} />}
          />
          <Route
            path="/tables"
            element={<Tables dataCollection={dataCollection} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
