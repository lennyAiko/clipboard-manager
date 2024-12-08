import { useEffect, useState } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import { clear } from "@tauri-apps/plugin-clipboard-manager";
import useClipboardListener from "./hooks/useClipboardListener";
import { readFile, writeFile, BaseDirectory } from "@tauri-apps/plugin-fs";

function App() {
  const [items, setItems] = useState("");
  const [clearStorage, setClear] = useState(false);
  const [data, setData] = useState([]);

  useClipboardListener(1000, setItems, data);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) ?? [];
    setData(data);
  }, [clearStorage]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data")) ?? [];
    data.pop(items);
    data.push(items);
    localStorage.setItem("data", JSON.stringify(data));
    setClear(!clearStorage);
    // setData((previous) => [...previous, items]);
  }, [items]);

  async function clearClipboard() {
    await clear();
    // setData([]);
    setClear(!clearStorage);
    localStorage.setItem("data", JSON.stringify([]));
  }

  return (
    <main className="container min-h-screen bg-blue-950">
      <ClearButton onClick={clearClipboard} />

      <div className="overflow-hidden h-[500px] overflow-y-scroll">
        <Board items={data} />
      </div>
    </main>
  );
}

export default App;
