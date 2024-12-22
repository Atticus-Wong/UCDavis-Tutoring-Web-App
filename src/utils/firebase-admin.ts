import * as admin from 'firebase-admin'

const firebase_admin_key = process.env.FIREBASE_PRIVATE_KEY
if (!firebase_admin_key) {
  throw new Error(
    'Firebase private key is not defined in environment variables'
  )
}
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: firebase_admin_key.replace(/\\n/g, '\n'),
    }),
  })
}

export const auth = admin.auth()
export { admin };
