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

// GET: fetch all milestones or one by ID
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic");

    if (topic) {
      // Fetch specific milestone
      const milestonesRef = doc(db, "milestones", topic);
      const milestonesSnap = await getDoc(milestonesRef);

      if (!milestonesSnap.exists())
        return new Response("Featured milestone not found", { status: 404 });

      return NextResponse.json(milestonesSnap.data());
    } else {
      // Fetch all milestones
      const milestoneSnapshot = await getDocs(collection(db, "milestones"));

      const milestones = milestoneSnapshot.docs.map((milestone) =>
        milestone.data()
      );

      return NextResponse.json(milestones);
    }
  } catch (error) {
    console.error("Error fetching milestones:", error);
    return new Response("Failed to fetch milestones", { status: 500 });
  }
}

// POST: create new milestone
export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { topic } = data;

    // Call the reusable service function
    await setDoc(doc(db, "milestones", topic), data);

    return NextResponse.json({ id: topic, message: "milestone created!" });
  } catch (error) {
    console.error("Error creating milestone:", error);
    return new Response("Failed to create milestone", { status: 500 });
  }
}

// PUT: update milestone by ID (Not working).
export async function PUT(req: Request) {
  try {
    const data = await req.json();
    const { topic, milestones } = data;

    if (!topic) return new Response("Missing milestone ID", { status: 400 });

    const milestoneRef = doc(db, "milestones", topic);

    await updateDoc(milestoneRef, { id: topic, milestones: milestones });

    return NextResponse.json({ topic, message: "milestone updated!" });
  } catch (error) {
    console.error("Error updating milestone:", error);
    return new Response("Failed to update milestone", { status: 500 });
  }
}

// DELETE: delete milestone by topic
export async function DELETE(req: Request) {
  try {
    const data = await req.json();
    const { topic } = data;

    if (!topic) return new Response("Missing milestone topic", { status: 400 });

    await deleteDoc(doc(db, "milestones", topic));

    return NextResponse.json({ topic, message: "milestone deleted!" });
  } catch (error) {
    console.error("Error deleting milestone:", error);
    return new Response("Failed to delete milestone", { status: 500 });
  }
}
