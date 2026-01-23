const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const ROOT_DIR = process.cwd();
const DIST_DIR = path.resolve(ROOT_DIR, "dist");
const TEMP_BUILD = path.resolve(ROOT_DIR, "temp_build");

const buildAndPublish = () => {
  try {
    console.log("Starting build process...");
    [DIST_DIR, TEMP_BUILD].forEach((dir) => {
      if (fs.existsSync(dir)) {
        fs.rmSync(dir, { recursive: true, force: true });
      }
    });
    execSync("pnpm run build", { stdio: "inherit" });

    const finalDistPath = path.join(TEMP_BUILD, "dist");
    fs.mkdirSync(finalDistPath, { recursive: true });

    if (fs.existsSync(DIST_DIR)) {
      fs.cpSync(DIST_DIR, finalDistPath, { recursive: true });
      fs.rmSync(DIST_DIR, { recursive: true, force: true });
    }

    const packageJson = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "package.json"), "utf8"));

    if (packageJson.scripts) {
      delete packageJson.scripts.prepublishOnly;
      delete packageJson.scripts.release;
      delete packageJson.scripts.publish;
      delete packageJson.scripts["patch:release"];
    }

    fs.writeFileSync(path.join(TEMP_BUILD, "package.json"), JSON.stringify(packageJson, null, 2));

    [".npmrc", "README.md", "pnpm-lock.yaml"].forEach((file) => {
      const src = path.join(ROOT_DIR, file);
      if (fs.existsSync(src)) {
        fs.copyFileSync(src, path.join(TEMP_BUILD, file));
      }
    });

    // execSync('npm pack', { cwd: TEMP_BUILD, stdio: 'inherit' });

    console.log("\nStarting publish process...");

    execSync("npm publish --ignore-scripts", { cwd: TEMP_BUILD, stdio: "inherit" });

    console.log("\n🎉Package published successfully!");
  } catch (error) {
    console.error("❌ Error during publish process", error.message);
    process.exit(1);
  } finally {
    if (fs.existsSync(TEMP_BUILD)) {
      try {
        fs.rmSync(TEMP_BUILD, { recursive: true, force: true });
      } catch (e) {
        console.log(e);
      }
    }
  }
};

buildAndPublish();
