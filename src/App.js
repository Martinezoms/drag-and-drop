import { library } from "@fortawesome/fontawesome-svg-core";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import CardList from "./Components/CardList";
import "./App.css";

library.add(faL, faTimes);

function App() {
  return (
    <div className="App">
      <div className="p-2 bg-white mb-12">
        <h1 className="text-center">Manage Your Tasks</h1>
      </div>
      <CardList />
    </div>
  );
}

export default App;
