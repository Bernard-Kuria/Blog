import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  addDoc,
  getDoc,
} from "firebase/firestore";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ commentId: string }>;
  }
) {
  try {
    const { commentId } = await params;

    const commentsRef = doc(db, "comments", commentId);
    const commentsSnap = await getDoc(commentsRef);

    if (!commentsSnap.exists())
      return new Response("Comment not found", { status: 404 });

    const { internalId, ...commentData } = commentsSnap.data();

    return NextResponse.json({
      docId: commentsSnap.id, // Firebase doc ID (optional)
      id: internalId,
      ...commentData,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response("Failed to fetch blog", { status: 500 });
  }
}

// POST: create new comment
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { id, ...commentData } = data;

    // Reference the collection. `addDoc` will create a new document within it.
    const commentCollection = collection(db, "comments");

    // Save comment metadata
    const docRef = await addDoc(commentCollection, {
      internalId: id,
      ...commentData,
    });

    return NextResponse.json({ id: docRef.id, message: "comment created!" });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response("Failed to create comment", { status: 500 });
  }
}

// PUT: update comment by ID (Not working).
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ commentId: string }>;
  }
) {
  try {
    const { commentId } = await params;

    const data = await req.json();

    if (!commentId) return new Response("Missing comment ID", { status: 400 });

    const commentRef = doc(db, "comments", commentId);

    await setDoc(commentRef, data, { merge: true });

    return NextResponse.json({ message: "comment updated!" });
  } catch (error) {
    console.error("Error updating comment:", error);
    return new Response("Failed to update comment", { status: 500 });
  }
}

// DELETE: delete comment by ID
export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ commentId: string }>;
  }
) {
  try {
    const { commentId } = await params;

    if (!commentId) return new Response("Missing comment ID", { status: 400 });

    await deleteDoc(doc(db, "comments", commentId));

    return NextResponse.json({ commentId, message: "comment deleted!" });
  } catch (error) {
    console.error("Error deleting comment:", error);
    return new Response("Failed to delete comment", { status: 500 });
  }
}
