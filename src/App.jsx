import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import data from "./utils/data";
import {
  clear,
  readText,
  readImage,
} from "@tauri-apps/plugin-clipboard-manager";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    // setGreetMsg(await invoke("greet", { name }));
    console.log(await readText());
  }

  console.log(data);
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
