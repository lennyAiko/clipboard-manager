import { useEffect, useState } from "react";
import "./App.css";
import ClearButton from "./components/ClearButton";
import Board from "./components/Board";
import data from "./utils/data";
import { clear } from "@tauri-apps/plugin-clipboard-manager";
import useClipboardListener from "./hooks/useClipboardListener";
import { readFile, writeFile, BaseDirectory } from "@tauri-apps/plugin-fs";

function App() {
  const [items, setItems] = useState([]);

  const data = useClipboardListener(1000, setItems);

  // useEffect(() => {
  //   setData([...data, items]);
  // }, [items]);

  async function clearClipboard() {
    setData([]);
    await clear();
  }

  // Read file content
  const readFile = async () => {
    try {
      const content = await readFile("data.json", {
        dir: BaseDirectory.Home,
      });
      setFileContent(content);
      console.log("File read successfully:", content);
    } catch (error) {
      console.error("Error reading file:", error);
    }
  };

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
