import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import { collection, where, getDocs, query } from "firebase/firestore";

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ blogCommentId: string }>;
  }
) {
  try {
    const { blogCommentId } = await params;

    const commentsRef = collection(db, "comments");
    const q = query(commentsRef, where("internalId", "==", blogCommentId));
    const querySnapshot = await getDocs(q);

    const comments = querySnapshot.docs.map((doc) => {
      const { internalId, ...commentData } = doc.data();

      return {
        docId: doc.id, // Firebase doc ID (optional)
        id: internalId,
        ...commentData,
      };
    });

    if (comments.length === 0)
      return new Response("No comments found for this ID", { status: 404 });

    return NextResponse.json(comments);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return new Response("Failed to fetch blog", { status: 500 });
  }
}
