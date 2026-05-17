import {
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc,
  doc,
  type Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export type Submission = {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  status: string;
  source?: string;
  createdAt?: Timestamp | null;
  // enrolment fields
  course?: string;
  experience?: string;
  // contact fields
  subject?: string;
  message?: string;
};

export type CollectionType = 'enrolments' | 'contacts';

export async function fetchSubmissions(coll: CollectionType): Promise<Submission[]> {
  const q = query(collection(db, coll), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Omit<Submission, 'id'>) }));
}

export async function updateStatus(coll: CollectionType, id: string, status: string) {
  return updateDoc(doc(db, coll, id), { status });
}
