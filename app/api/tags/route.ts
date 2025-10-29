import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  getDoc,
  setDoc,
} from "firebase/firestore";

// GET: fetch all tags or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific tag
      const tagsRef = doc(db, "tags", id);
      const tagsSnap = await getDoc(tagsRef);

      if (!tagsSnap.exists())
        return new Response("Featured tag not found", { status: 404 });

      return NextResponse.json(tagsSnap.data());
    } else {
      // Fetch all tags
      const tagSnapshot = await getDocs(collection(db, "tags"));

      const tags = tagSnapshot.docs.map((tag) => tag.data());

      return NextResponse.json(tags);
    }
  } catch (error) {
    console.error("Error fetching tags:", error);
    return new Response("Failed to fetch tags", { status: 500 });
  }
}

// POST: create new tag
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { topic } = data;

    // Call the reusable service function
    await setDoc(doc(db, "tags", topic), data);

    return NextResponse.json({ id: topic, message: "Tag created!" });
  } catch (error) {
    console.error("Error creating tag:", error);
    return new Response("Failed to create tag", { status: 500 });
  }
}

// PUT: update tag by ID (Not working).
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { topic, tags } = data;

    if (!topic) return new Response("Missing tag ID", { status: 400 });

    const tagRef = doc(db, "tags", topic);

    await updateDoc(tagRef, { id: topic, tags: tags });

    return NextResponse.json({ topic, message: "tag updated!" });
  } catch (error) {
    console.error("Error updating tag:", error);
    return new Response("Failed to update tag", { status: 500 });
  }
}

// DELETE: delete tag by topic
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { topic } = data;

    if (!topic) return new Response("Missing tag topic", { status: 400 });

    await deleteDoc(doc(db, "tags", topic));

    return NextResponse.json({ topic, message: "tag deleted!" });
  } catch (error) {
    console.error("Error deleting tag:", error);
    return new Response("Failed to delete tag", { status: 500 });
  }
}
