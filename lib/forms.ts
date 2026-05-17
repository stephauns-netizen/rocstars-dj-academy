// Form submission helpers — write enrolment/contact submissions to Firestore.
// Reads are blocked at the rules level — Stephaun reviews submissions from the Firebase console.

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

export type EnrolmentInput = {
  fullName: string;
  email: string;
  phone: string;
  course: string;
  experience?: string;
};

export type ContactInput = {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
};

export async function submitEnrolment(data: EnrolmentInput) {
  return addDoc(collection(db, 'enrolments'), {
    ...data,
    status: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
  });
}

export async function submitContact(data: ContactInput) {
  return addDoc(collection(db, 'contacts'), {
    ...data,
    status: 'new',
    source: 'website',
    createdAt: serverTimestamp(),
  });
}
