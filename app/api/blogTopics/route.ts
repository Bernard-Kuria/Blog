import { NextResponse } from "next/server";
import { db } from "@lib/firebase";
import {
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  addDoc,
} from "firebase/firestore";

// GET: fetch all topic or one by ID
export async function GET(req: Request) {
  try {
    const topicsSnapshot = await getDocs(collection(db, "blogTopics"));

    return NextResponse.json(
      topicsSnapshot.docs.map((topic) => {
        return { id: topic.id, ...topic.data() };
      })
    );
  } catch (error) {
    console.error("Error fetching topics:", error);
    return new Response("Failed to fetch topics", { status: 500 });
  }
}

// POST: create new topic
export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Reference the collection. `addDoc` will create a new document within it.
    const blogTopicCollection = collection(db, "blogTopics");

    // Save blog metadata
    const docRef = await addDoc(blogTopicCollection, data);

    return NextResponse.json({ id: docRef.id, message: "topic created!" });
  } catch (error) {
    console.error("Error creating topic:", error);
    return new Response("Failed to create topic", { status: 500 });
  }
}

// PUT: update topic by ID
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { id, ...topicdata } = data;

    if (!id) return new Response("Missing topic ID", { status: 400 });

    const topicRef = doc(db, "blogTopics", id);

    await updateDoc(topicRef, { id: id, ...topicdata });

    return NextResponse.json({ id, message: "Topic updated!" });
  } catch (error) {
    console.error("Error updating topic:", error);
    return new Response("Failed to update topic", { status: 500 });
  }
}

// DELETE: delete topic by ID
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { id } = data;

    if (!id) return new Response("Missing topic ID", { status: 400 });

    await deleteDoc(doc(db, "blogTopics", id));

    return NextResponse.json({ id, message: "Topic deleted!" });
  } catch (error) {
    console.error("Error deleting topic:", error);
    return new Response("Failed to delete topic", { status: 500 });
  }
}
