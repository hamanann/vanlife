import { initializeApp } from 'firebase/app';
import {
  collection,
  doc,
  getFirestore,
  getDocs,
  getDoc,
  query,
  where,
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: 'AIzaSyCY9gNbiTCXDhnI4jV5XKqh43H-mGvck-c',
  authDomain: 'vanlife-49734.firebaseapp.com',
  projectId: 'vanlife-49734',
  storageBucket: 'vanlife-49734.appspot.com',
  messagingSenderId: '741889132006',
  appId: '1:741889132006:web:10e5ffb25653b0bf6c4227',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const vansCollectionRef = collection(db, 'vans');
// Refactor the fetching functions

export async function getVans() {
  const querySnapshot = await getDocs(vansCollectionRef);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function getVan(id) {
  const docRef = doc(db, 'vans', id);
  const vanSnapshot = await getDoc(docRef);
  const data = { ...vanSnapshot.data(), id: vanSnapshot.id };
  return data;
}

export async function getHostVans() {
  const q = query(vansCollectionRef, where('hostId', '==', '123'));
  const querySnapshot = await getDocs(q);
  const dataArr = querySnapshot.docs.map(doc => ({
    ...doc.data(),
    id: doc.id,
  }));
  return dataArr;
}

export async function loginUser(creds) {
  const res = await fetch('/api/login', {
    method: 'post',
    body: JSON.stringify(creds),
  });
  const data = await res.json();

  if (!res.ok) {
    throw {
      message: data.message,
      statusText: res.statusText,
      status: res.status,
    };
  }

  return data;
}
