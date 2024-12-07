import { useEffect, useState } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import data from "./utils/data";
import {
  readText,
  readImage,
  clear,
} from "@tauri-apps/plugin-clipboard-manager";
import useClipboardListener from "./hooks/useClipboardListener";

function App() {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);
  useClipboardListener(1000, setItems);

  useEffect(() => {
    setData([...data, items]);
  }, [items]);

  async function greet() {
    const text = await readText();
    console.log(text);
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
