import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
  getDoc,
  where,
  query,
} from "firebase/firestore";

// GET: fetch all comments or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    const matchId = url.searchParams.get("matchId"); // 👈 new query param

    // ✅ Case 1: Fetch comments with specific internal ID
    if (matchId) {
      const commentsRef = collection(db, "comments");
      const q = query(commentsRef, where("id", "==", matchId));
      const querySnapshot = await getDocs(q);

      const comments = querySnapshot.docs.map((doc) => ({
        docId: doc.id, // Firebase doc ID (optional)
        ...doc.data(),
      }));

      if (comments.length === 0)
        return new Response("No comments found for this ID", { status: 404 });

      return NextResponse.json(comments);
    }

    // ✅ Case 2: Fetch specific comment document
    if (id) {
      const commentsRef = doc(db, "comments", id);
      const commentsSnap = await getDoc(commentsRef);

      if (!commentsSnap.exists())
        return new Response("Comment not found", { status: 404 });

      return NextResponse.json(commentsSnap.data());
    }

    // ✅ Case 3: Fetch all comments
    const commentSnapshot = await getDocs(collection(db, "comments"));
    const comments = commentSnapshot.docs.map((doc) => doc.data());
    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response("Failed to fetch comments", { status: 500 });
  }
}

// POST: create new comment
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Reference the collection. `addDoc` will create a new document within it.
    const commentCollection = collection(db, "comments");

    // Save comment metadata
    const docRef = await addDoc(commentCollection, data);

    return NextResponse.json({ id: docRef.id, message: "comment created!" });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Failed to create comment", { status: 500 });
  }
}

// PUT: update comment by ID (Not working).
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...commentdata } = data;

    if (!id) return new Response("Missing comment ID", { status: 400 });

    const commentRef = doc(db, "comments", id);

    await updateDoc(commentRef, { id: id, ...commentdata });

    return NextResponse.json({ id, message: "comment updated!" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response("Failed to update comment", { status: 500 });
  }
}

// DELETE: delete comment by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing comment ID", { status: 400 });

    await deleteDoc(doc(db, "comments", id));

    return NextResponse.json({ id, message: "comment deleted!" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response("Failed to delete comment", { status: 500 });
  }
}
