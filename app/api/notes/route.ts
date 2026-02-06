import { NextResponse } from "next/server";

let notes: { id: number; text: string }[] = [];

export async function GET() {
  try {
    return NextResponse.json(notes);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch notes" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const newNote = { id: Date.now(), text: body.text };
    notes.push(newNote);

    return NextResponse.json(newNote, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "Failed to create note" }, { status: 500 });
  }
}
