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

  useEffect(() => {
    readFile();
  }, [items]);

  async function clearClipboard() {
    setData([]);
    await clear();
  }

  // Read file content
  const readFile = async () => {
    const content = await readFile("data.json", {
      dir: BaseDirectory.Home,
    });
    if (!content) {
      console.log("File does not exist");
      await writeFile("data.json", "[]", { dir: BaseDirectory.Home });
    } else {
      console.log("File read successfully:", content);
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
