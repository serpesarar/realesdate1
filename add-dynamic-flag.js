import fs from "fs";
import path from "path";

const apiDir = path.join(process.cwd(), "app", "api");

function addDynamicFlag(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      addDynamicFlag(fullPath);
    } else if (entry.isFile() && entry.name === "route.ts") {
      let content = fs.readFileSync(fullPath, "utf8");

      if (!content.includes("export const dynamic")) {
        content = `export const dynamic = "force-dynamic";\n\n` + content;
        fs.writeFileSync(fullPath, content, "utf8");
        console.log(`✅ Added dynamic flag to: ${fullPath}`);
      } else {
        console.log(`ℹ️ Already has dynamic flag: ${fullPath}`);
      }
    }
  }
}

addDynamicFlag(apiDir);
