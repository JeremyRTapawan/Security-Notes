"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { decryptNote, generateKey } from "../../utils/📄 encryption";

export default function Dashboard() {
  const { data: session } = useSession();
  const [notes, setNotes] = useState<any[]>([]);
  const [key, setKey] = useState<CryptoKey | null>(null);

  useEffect(() => {
    async function init() {
      setKey(await generateKey());
      fetchNotes();
    }
    init();
  }, []);

  async function fetchNotes() {
    const res = await fetch("/api/notes");
    if (!res.ok) {
      alert("Failed to fetch notes");
      return;
    }
    const data = await res.json();
    setNotes(data);
  }

  async function handleDecrypt(note: any) {
    if (!key) return;
    try {
      const text = await decryptNote(
        JSON.parse(note.ciphertext),
        key,
        JSON.parse(note.iv)
      );
      alert("Decrypted Note: " + text);
    } catch (err) {
      alert("Failed to decrypt note");
    }
  }

  if (!session) return <p>Please log in to view your dashboard.</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome {session.user?.name}</h1>
      <h2>Your Notes:</h2>
      {notes.length === 0 ? (
        <p>No notes yet. Create one!</p>
      ) : (
        <ul>
          {notes.map((n) => (
            <li key={n.id} style={{ marginBottom: "1rem" }}>
              <button onClick={() => handleDecrypt(n)}>
                Decrypt Note {n.id}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
