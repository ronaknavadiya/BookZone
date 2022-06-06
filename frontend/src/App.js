import "./App.css";
import { useAppContext } from "./context/appContext";

function App() {
  const data = useAppContext();
  console.log("data:", data);
  return (
    <div className="App">
      <h1>Book ZOne</h1>
    </div>
  );
}

export default App;
