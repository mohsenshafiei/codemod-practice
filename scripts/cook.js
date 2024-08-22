import fs from "fs";
import path from "path";

// Utils
import { findProjectRoot } from "./utils/index.js";
import { getCodemodConfigValue } from "./getCodemodConfigValue.js";

// Define the JSON content

export const cook = async () => {
  const codemodNames = await getCodemodConfigValue("name");

  const jsonData = {
    $schema: "",
    name: "migration-recipe",
    version: "1.0.0",
    engine: "recipe",
    private: false,
    arguments: [],
    meta: {},
    names: [...codemodNames],
  };

  // Specify the file path
  const p = await findProjectRoot();
  console.log(p);
  const filePath = path.join(p, ".codemodrc.json");

  // Write the JSON data to the file
  await fs.writeFile(filePath, JSON.stringify(jsonData, null, 2), (err) => {
    if (err) {
      console.error("Error writing the JSON file:", err);
    } else {
      console.log("JSON file created successfully at", filePath);
    }
  });
};
