// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import {
  getFirestore,
  DocumentData,
  collection,
  CollectionReference,
} from 'firebase/firestore'
import { getAuth, signInWithCustomToken } from 'firebase/auth'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: `${process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN}.firebaseapp.com`,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: `${process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET}.appspot.com`,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
export const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app)
export const db = getFirestore(app)

export function useFirebaseAuth() {
  const { data: session } = useSession()

  // Track session changes
  useEffect(() => {
    try {
      if (session?.firebaseToken) {
        signInWithCustomToken(auth, session.firebaseToken)
      }
    } catch (error) {
      console.error('useFirebaseAuth error:', error)
    }
  }, [session])
}
// Firestore typings
const createCollection = <T = DocumentData>(collectionName: string) => {
  return collection(db, collectionName) as CollectionReference<T>
}

export const attendanceCol = createCollection<AttendanceEntries>('attendance')
export const helpSessionsCol =
  createCollection<HelpSessionEntries>('helpSessions')
export const serverBackupsCol = createCollection<ServerBackup>('serverBackups')
