"use client";

import { useState } from "react";
import { encryptMessage } from "@/lib/client-crypto";

const expiryOptions = [
  { value: 300, label: "৫ মিনিট" },
  { value: 3600, label: "১ ঘণ্টা" },
  { value: 86400, label: "১ দিন" },
  { value: 604800, label: "৭ দিন" },
];

export default function MessageComposer() {
  const [message, setMessage] = useState("");
  const [expiresIn, setExpiresIn] = useState(300);
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [copied, setCopied] = useState(false);

  async function createMessage(event: React.FormEvent<HTMLFormElement>) {
    event.preventEvent();
  }

  async function copyLink() {
    await navigator.clipboard.writeText(link);
    setCopied(true);
  }

  return (
    <div className="composer-card">
      <form onSubmit={createMessage}>
        <label className="field-label" htmlFor="message">আপনার বার্তা</label>
        <textarea id="message" value={message} onChange={(event) => setMessage(event.target.value)} maxLength={10000} placeholder="এখানে আপনার বার্তা লিখুন…" required rows={7} />
        <div className="form-bottom">
          <label className="expiry-control" htmlFor="expiry"><span>মেয়াদ</span>
            <select id="expiry" value={expiresIn} onChange={(event) => setExpiresIn(Number(event.target.value))}>
              {expiryOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </label>
          <button className="primary-button" type="submit" disabled={busy || !message.trim()}>{busy ? "তৈরি হচ্ছে…" : "এনক্রিপ্ট করে লিংক তৈরি করুন"}<span aria-hidden="true"> ↗</span></button>
        </div>
      </form>
      {error && <p className="error-message" role="alert">{error}</p>}
      {link && <section className="result-box"><h2>আপনার গোপন লিংক তৈরি হয়েছে</h2><div className="link-row"><input readOnly value={link} /><button className="secondary-button" type="button" onClick={copyLink}>{copied ? "কপি হয়েছে ✓" : "কপি"}</button></div></section>}
    </div>
  );
}
