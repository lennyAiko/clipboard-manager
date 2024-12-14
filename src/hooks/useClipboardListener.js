import { useEffect, useState } from "react";
import { readText, readImage } from "@tauri-apps/plugin-clipboard-manager";

const useClipboardListener = (
  pollInterval = 1000,
  item = "",
  dataRef,
  stuff
) => {
  useEffect(() => {
    const checkClipboard = async () => {
      try {
        const content = await readText();

        if (content && content !== "") {
          const isAdded = dataRef.some((i) => {
            return i === content;
          });
          if (!isAdded) {
            item(content);
          }
        }
      } catch (err) {
        console.error("Error reading clipboard:", err);
      }
    };

    const interval = setInterval(checkClipboard, pollInterval);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [pollInterval, stuff]);

  // return data;
};

export default useClipboardListener;
