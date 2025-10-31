import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from "firebase/firestore";

// GET: fetch all drafts or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific draft
      const draftRef = doc(db, "drafts", id);
      const draftSnap = await getDoc(draftRef);

      if (!draftSnap.exists())
        return new Response("Draft not found", { status: 404 });

      return NextResponse.json(draftSnap.data());
    } else if (topic) {
      const blogRef = collection(db, "drafts");
      const q = query(blogRef, where("topic", "==", topic));
      const querySnapshot = await getDocs(q);

      const drafts = querySnapshot.docs.map((doc) => doc.data());

      if (drafts.length === 0)
        return new Response("No featured blogs found for this topic", {
          status: 404,
        });

      return NextResponse.json(drafts);
    } else {
      // Fetch all drafts
      const draftSnapshot = await getDocs(collection(db, "drafts"));

      return NextResponse.json(draftSnapshot.docs.map((doc) => doc.data()));
    }
  } catch (error) {
    console.error("Error fetching drafts:", error);
    return new Response("Failed to fetch drafts", { status: 500 });
  }
}

// POST: create new draft
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    // Save draft metadata
    await setDoc(doc(db, "drafts", id), data);

    return NextResponse.json({ id: id, message: "Draft created!" });
  } catch (error) {
    console.error("Error creating draft:", error);
    return new Response("Failed to create draft", { status: 500 });
  }
}

// PUT: update draft by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...metadata } = data;

    if (!id) return new Response("Missing draft ID", { status: 400 });

    const draftRef = doc(db, "drafts", id);

    await updateDoc(draftRef, { id: id, draftMeta: metadata });

    return NextResponse.json({ id, message: "Blog updated!" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return new Response("Failed to update blog", { status: 500 });
  }
}

// DELETE: delete draft by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing draft ID", { status: 400 });

    await deleteDoc(doc(db, "drafts", id));

    return NextResponse.json({ id, message: "Draft deleted!" });
  } catch (error) {
    console.error("Error deleting draft:", error);
    return new Response("Failed to delete draft", { status: 500 });
  }
}
