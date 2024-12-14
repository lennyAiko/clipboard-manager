import { useEffect, useState, useRef } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import { clear } from "@tauri-apps/plugin-clipboard-manager";
import useClipboardListener from "./hooks/useClipboardListener";
import { readFile, writeFile, BaseDirectory } from "@tauri-apps/plugin-fs";

function App() {
  const [items, setItems] = useState("");
  const [data, setData] = useState([]);

  const dataRef = useRef(data);

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  const handleDataUpdate = (data) => {
    setData((prev) => {
      const updatedData = [...prev, data];
      dataRef.current = updatedData;
      return updatedData;
    });
  };

  useClipboardListener(1000, handleDataUpdate, dataRef.current, data);

  async function clearClipboard() {
    await clear();
    setData([]);
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
