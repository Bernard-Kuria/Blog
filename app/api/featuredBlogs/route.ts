import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  setDoc,
  getDocs,
  deleteDoc,
  collection,
  query,
  where,
  getDoc,
} from "firebase/firestore";

// GET: fetch all featured blogs or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");
    const id = url.searchParams.get("id");

    // Fetch by ID
    if (id) {
      const docRef = doc(db, "featuredBlogs", id);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists())
        return new Response("Featured blog not found", { status: 404 });

      return NextResponse.json({ id: docSnap.id, ...docSnap.data() });
    }

    // Fetch by topic
    if (topic) {
      const featuredblogRef = collection(db, "featuredBlogs");
      const q = query(featuredblogRef, where("draftMeta.topic", "==", topic));
      const querySnapshot = await getDocs(q);

      const featuredBlogs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      if (featuredBlogs.length === 0)
        return new Response("No featured blogs found for this topic", {
          status: 404,
        });

      return NextResponse.json(featuredBlogs);
    }

    // Fetch all featured blogs
    const snapshot = await getDocs(collection(db, "featuredBlogs"));
    const allBlogs = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(allBlogs);
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
