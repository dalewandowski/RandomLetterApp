import Footer from "./Components/Footer/Footer.jsx";
import RandomLetter from "./Components/RandomLetter/RandomLetter.jsx";
import DigitalClock from "./Components/Clock/DigitalClock.jsx";

import "/app.css";
function App() {
  return (
    <>
      <DigitalClock />
      <RandomLetter />
      <Footer />
    </>
  );
}

export default App;
