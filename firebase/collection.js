import { getFirestore } from 'firebase-admin/firestore';
import app from './app.js';

class Collection {
  constructor(collection) {
    const db = getFirestore(app);
    this.collection = db.collection(collection);
  }

  async getItem(path) {
    const snapshot = await this.collection.doc(path).get();
    return snapshot.data();
  }

  async getItems() {
    const snapshot = await this.collection.get();
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return items;
  }

  async addItem(value) {
    const docRef = await this.collection.add(value);
    return docRef.id;
  }

  async updateItem(key, value) {
    return await this.collection.doc(key).set(value);
  }

  async removeItem(key) {
    return await this.collection.doc(key).delete();
  }

  async getCount() {
    return (await this.collection.count().get()).data().count;
  }
}

export default Collection;
