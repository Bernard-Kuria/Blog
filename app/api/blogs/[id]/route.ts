import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await params;

    if (id === "all") {
      const blogsSnapshot = await getDocs(collection(db, "blogContent"));

      return NextResponse.json(blogsSnapshot.docs.map((doc) => doc.data()));
    } else {
      const blogMetaRef = doc(db, "blogs", id);

      const blogContentRef = doc(db, "blogContent", id);

      const [metaSnap, contentSnap] = await Promise.all([
        getDoc(blogMetaRef),
        getDoc(blogContentRef),
      ]);

      if (!metaSnap.exists() || !contentSnap.exists())
        return new Response("Blog not found", { status: 404 });

      const blogData = {
        id,
        blogMeta: metaSnap.data().blogMeta,
        blogContent: contentSnap.data().blogContent,
      };

      return NextResponse.json(blogData);
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response("Failed to fetch blog", { status: 500 });
  }
}

// POST: create new blog
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, blogContent } = data;

    // Save blog content
    await setDoc(doc(db, "blogContent", id), {
      blogContent,
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
    const { id, ...content } = data;

    if (!id) return new Response("Missing blog ID", { status: 400 });

    const contentRef = doc(db, "blogContent", id);

    await updateDoc(contentRef, { id: id, blogContent: content });

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

    await deleteDoc(doc(db, "blogContent", id));

    return NextResponse.json({ id, message: "Blog deleted!" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    return new Response("Failed to delete blog", { status: 500 });
  }
}
