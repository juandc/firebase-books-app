export default function storage(firebase) {
  const storage = firebase.firestore();

  const testStorage = createStorage(storage);

  return {
    testStorage,
  };
}

const createStorage = storage => cb => storage.createStorage(cb);
