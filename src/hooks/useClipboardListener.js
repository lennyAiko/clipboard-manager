import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core";
import {
  readText,
  readImage,
  clear,
} from "@tauri-apps/plugin-clipboard-manager";

const useClipboardListener = (pollInterval = 1000, data = []) => {
  const [clipboardContent, setClipboardContent] = useState("");

  useEffect(() => {
    let lastClipboardContent = "";

    const checkClipboard = async () => {
      try {
        // const content = await invoke("plugin:clipboard|read_text");
        const content = await readText();
        if (content && content !== lastClipboardContent) {
          lastClipboardContent = content;
          setClipboardContent(content);
          data(content);
          console.log("Clipboard content changed:", content);
        }
      } catch (err) {
        console.error("Error reading clipboard:", err);
      }
    };

    const interval = setInterval(checkClipboard, pollInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pollInterval]);

  return clipboardContent;
};

export default useClipboardListener;
