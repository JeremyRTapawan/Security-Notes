"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome to Secure Notes App</h1>

      {!session ? (
        <button onClick={() => signIn("google")}>Sign in with Google</button>
      ) : (
        <div>
          <p>Signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>

          <div style={{ marginTop: "1rem" }}>
            {/* Links to Dashboard and Create Note pages */}
            <Link href="/dashboard">
              <button style={{ marginRight: "1rem" }}>Go to Dashboard</button>
            </Link>

            <Link href="/create-note">
              <button>Create a Note</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
