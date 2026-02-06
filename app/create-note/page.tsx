"use client";

import { useState, useEffect } from "react";

type Note = {
  id: number;
  text: string;
};

export default function HomePage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  // Fetch notes on page load
  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const res = await fetch("/api/notes");
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err) {
      setError("Error fetching notes");
      console.error(err);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text }),
      });
      if (!res.ok) throw new Error("Failed to create note");

      const newNote = await res.json();
      setNotes((prev) => [...prev, newNote]);
      setText("");
    } catch (err) {
      setError("Error creating note");
      console.error(err);
    }
  }

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>Notes App</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          style={{ padding: "0.5rem", width: "300px" }}
        />
        <button
          type="submit"
          style={{ padding: "0.5rem 1rem", marginLeft: "1rem" }}
        >
          Add Note
        </button>
      </form>

      <ul style={{ marginTop: "2rem" }}>
        {notes.map((note) => (
          <li key={note.id} style={{ padding: "0.5rem 0" }}>
            {note.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
