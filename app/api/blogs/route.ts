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
} from "firebase/firestore";

// GET: fetch all blogs or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific blog
      const blogRef = doc(db, "blogs", id);
      const blogSnap = await getDoc(blogRef);

      if (!blogSnap.exists())
        return new Response("Blog not found", { status: 404 });

      return NextResponse.json(blogSnap.data());
    } else {
      // Fetch all blogs
      const blogSnapshot = await getDocs(collection(db, "blogs"));

      return NextResponse.json(blogSnapshot.docs.map((doc) => doc.data()));
    }
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return new Response("Failed to fetch blogs", { status: 500 });
  }
}

// POST: create new blog
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, metadata } = data;

    // Save blog metadata
    await setDoc(doc(db, "blogs", id), {
      blogMeta: metadata,
      id: id,
    });

    return NextResponse.json({ id: id, message: "Blog created!" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response("Failed to create blog", { status: 500 });
  }
}

// PUT: update blog by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...metadata } = data;

    if (!id) return new Response("Missing blog ID", { status: 400 });

    const blogRef = doc(db, "blogs", id);

    await updateDoc(blogRef, { id: id, blogMeta: metadata });

    return NextResponse.json({ id, message: "Blog updated!" });
  } catch (error) {
    console.error("Error updating blog:", error);
    return new Response("Failed to update blog", { status: 500 });
  }
}

// DELETE: delete blog by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing blog ID", { status: 400 });

    await deleteDoc(doc(db, "blogs", id));

    return NextResponse.json({ id, message: "Blog deleted!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response("Failed to delete blog", { status: 500 });
  }
}
