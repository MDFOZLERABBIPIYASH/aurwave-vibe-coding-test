import { describe, it, expect } from "vitest";
import { execSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * Lockfile-sync guard.
 *
 * `npm ci` (used by the CI workflow) is strict — it fails if
 * `package.json` and `package-lock.json` disagree. This test
 * runs `npm install --package-lock-only` in dry-run mode and
 * asserts the result is "Lockfile is up to date", catching
 * the drift before CI does.
 *
 * Also asserts the lockfile version is what we expect
 * (`lockfileVersion: 3`) so a future npm major bump is a
 * conscious decision.
 */

describe("package-lock.json", () => {
  it("is in sync with package.json (npm ci would succeed)", () => {
    const cwd = resolve(__dirname, "../..");
    let out = "";
    try {
      out = execSync("npm install --package-lock-only --dry-run", {
        cwd,
        encoding: "utf8",
        stdio: ["ignore", "pipe", "pipe"],
      });
    } catch (err) {
      // npm exit code != 0 means the lockfile is out of sync.
      // Surface the stderr so the test failure explains what to do.
      const stderr = (err as { stderr?: Buffer | string }).stderr?.toString() ?? "";
      throw new Error(
        `package-lock.json is out of sync with package.json.\n` +
          `Run \`npm install\` locally and commit the updated lockfile.\n\n` +
          stderr,
      );
    }
    expect(out).toMatch(/up to date/i);
  });

  it("uses lockfileVersion 3", () => {
    const cwd = resolve(__dirname, "../..");
    const lockfile = JSON.parse(
      readFileSync(resolve(cwd, "package-lock.json"), "utf8"),
    ) as { lockfileVersion: number };
    expect(lockfile.lockfileVersion).toBe(3);
  });
});
