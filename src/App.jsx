import { useEffect, useState } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import data from "./utils/data";
import {
  writeText,
  readText,
  clear,
} from "@tauri-apps/plugin-clipboard-manager";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");
  async function greet() {
    console.log("greet");
    await writeText("Tauri is awesome!");
    // const text = await readText();
    // console.log(text);
  }

  return (
    <main className="container min-h-screen bg-blue-950">
      <ClearButton onClick={greet} />

      <div className="overflow-hidden h-[500px] overflow-y-scroll">
        <Board items={data} />
      </div>
    </main>
  );
}

export default App;
