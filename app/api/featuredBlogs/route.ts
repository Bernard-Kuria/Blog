import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  collection,
} from "firebase/firestore";

// GET: fetch all featured blogs or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (id) {
      // Fetch specific blog
      const featuredblogRef = doc(db, "featuredBlogs", id);
      const featuredblogSnap = await getDoc(featuredblogRef);

      if (!featuredblogSnap.exists())
        return new Response("Featured Blog not found", { status: 404 });

      return NextResponse.json(featuredblogSnap.data());
    } else {
      // Fetch all blogs
      const blogSnapshot = await getDocs(collection(db, "featuredBlogs"));

      const featuredBlogs = blogSnapshot.docs.map((doc) => ({
        id: doc.id,
        topic: doc.data().topic,
      }));

      return NextResponse.json(featuredBlogs);
    }
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return new Response("Failed to fetch featured blogs", { status: 500 });
  }
}

// POST: create new blog
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, topic } = data;

    // Call the reusable service function
    await setDoc(doc(db, "featuredBlogs", id), {
      topic: topic,
      id: id,
    });

    return NextResponse.json({ id: id, message: "Blog created!" });
  } catch (error) {
    console.error("Error creating blog:", error);
    return new Response("Failed to create blog", { status: 500 });
  }
}

// PUT: update or create blog by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, topic } = data;

    // This single operation updates if the doc exists or creates it if not.
    // It is a much more efficient "upsert" pattern.
    const blogRef = doc(db, "featuredBlogs", id);
    await setDoc(blogRef, { topic, id }, { merge: true });

    return NextResponse.json({ id, message: "Blog updated or created!" });
  } catch (error) {
    console.error("Error updating/creating blog:", error);
    return new Response("Failed to update or create blog", { status: 500 });
  }
}

// DELETE: delete blog by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing blog ID", { status: 400 });

    await deleteDoc(doc(db, "featuredBlogs", id));

    return NextResponse.json({ id, message: "Featured Blog deleted!" });
  } catch (error) {
    console.error("Error deleting  featured blog:", error);
    return new Response("Failed to delete  featured blog", { status: 500 });
  }
}
