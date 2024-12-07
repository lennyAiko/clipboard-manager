import { useEffect, useState } from "react";
import { readText, readImage } from "@tauri-apps/plugin-clipboard-manager";
import {
  readTextFile,
  readFile,
  writeTextFile,
  BaseDirectory,
} from "@tauri-apps/plugin-fs";

const useClipboardListener = (pollInterval = 1000, item = "") => {
  const [clipboardContent, setClipboardContent] = useState("");
  const [fileContent, setFileContent] = useState("");
  const [newContent, setNewContent] = useState("");
  const [data, setData] = useState([]);

  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const content = await readText();

        if (content && !data.find((item) => item === content)) {
          item(content);
          setData([...data, content]);
        }
      } catch (err) {
        console.error("Error reading clipboard:", err);
      }
    };

    const interval = setInterval(checkClipboard, pollInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pollInterval]);

  return data;
};

export default useClipboardListener;
