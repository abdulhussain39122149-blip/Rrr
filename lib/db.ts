import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

const dataDirectory = path.resolve(process.env.DATA_DIR || ".data");
mkdirSync(dataDirectory, { recursive: true });
const database = new Database(path.join(dataDirectory, "messages.sqlite"));
database.pragma("journal_mode = WAL");
database.exec(`CREATE TABLE IF NOT EXISTS messages (token TEXT PRIMARY KEY, ciphertext TEXT NOT NULL, iv TEXT NOT NOT NULL, expires_at INTEGER NOT NULL, created_at INTEGER NOT NULL);`);

export function insertMessage(message: { token: string; ciphertext: string; iv: string; expiresAt: number }) {
  database.prepare("INSERT INTO messages (token, ciphertext, iv, expires_at, created_at) VALUES (?, ?, ?, ?, ?)").run(message.token, message.ciphertext, message.iv, message.expiresAt, Date.now());
}

export function getMessage(token: string) {
  database.prepare("DELETE FROM messages WHERE expires_at <= ?").run(Date.now());
  return database.prepare("SELECT ciphertext, iv, expires_at AS expiresAt FROM messages WHERE token = ?").get(token) as { ciphertext: string; iv: string; expiresAt: number } | undefined;
}
