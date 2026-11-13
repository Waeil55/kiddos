// One-time setup of the Kiddos AI voice on Supabase (OpenAI speech, using the OPENAI_API_KEY secret
// already stored in the Supabase project). Run from the Kiddos folder after `npx supabase login`:
//   node deploy/setup-voice.mjs
// It creates a private token, saves it as a Supabase secret, deploys supabase/functions/kiddos-tts,
// and writes KIDDOS_TTS_URL and KIDDOS_TTS_TOKEN into .env (the token is never printed).
import { execSync } from "node:child_process";
import { randomBytes } from "node:crypto";
import fs from "node:fs";

const REF = process.env.SUPABASE_PROJECT_REF || "bgkugdyrqtsglavoghvb";
const URL = `https://${REF}.supabase.co/functions/v1/kiddos-tts`;
const run = (cmd) => execSync(cmd, { stdio: "inherit" });

const env = fs.existsSync(".env") ? fs.readFileSync(".env", "utf8") : "";
const token = /^KIDDOS_TTS_TOKEN=(.+)$/m.exec(env)?.[1]?.trim() || randomBytes(24).toString("hex");

run(`npx -y supabase@2 secrets set KIDDOS_TTS_TOKEN=${token} --project-ref ${REF}`);
run(`npx -y supabase@2 functions deploy kiddos-tts --project-ref ${REF} --no-verify-jwt --use-api`);

let out = env;
for (const [k, v] of Object.entries({ KIDDOS_TTS_URL: URL, KIDDOS_TTS_TOKEN: token })) {
  const line = `${k}=${v}`;
  out = new RegExp(`^${k}=.*$`, "m").test(out) ? out.replace(new RegExp(`^${k}=.*$`, "m"), line) : `${out}${out && !out.endsWith("\n") ? "\n" : ""}${line}\n`;
}
fs.writeFileSync(".env", out);

const res = await fetch(URL, { headers: { "x-kiddos-token": token } });
console.log(res.ok ? "Kiddos voice is ready. Restart the site to use it." : `The function answered ${res.status}: ${await res.text()}`);
