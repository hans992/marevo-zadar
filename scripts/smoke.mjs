import { spawn } from "node:child_process";

const port = "4173";
const base = `http://127.0.0.1:${port}`;
const server = spawn("bun", ["run", "start"], {
  env: { ...process.env, PORT: port, HOST: "127.0.0.1" },
  stdio: "inherit",
});

const routes = [
  ["/", "Find your perfect day at sea"],
  ["/search", "Boats and experiences"],
  ["/operator", "Good morning, Luka."],
  ["/experiences/kornati-private-escape", "Kornati Private Escape"],
];

const waitForServer = async () => {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(base);
      if (response.ok) return;
    } catch {}
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  throw new Error("Production server did not become ready");
};

try {
  await waitForServer();
  for (const [path, expected] of routes) {
    const response = await fetch(base + path);
    const html = await response.text();
    if (!response.ok || !html.includes(expected)) {
      throw new Error(`Smoke check failed for ${path}: ${response.status}`);
    }
    console.log(`✓ ${path}`);
  }
} finally {
  server.kill("SIGTERM");
}
