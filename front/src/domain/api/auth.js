export default function auth(firebase) {
  const auth = firebase.auth();

  const listenAuthChanges = onAuthStateChanged(auth);
  const signUpUserEmail = createUserWithEmailAndPassword(auth);
  const signInUserEmail = signInWithEmailAndPassword(auth);
  const signOutUser = signOut(auth);

  return {
    listenAuthChanges,
    signUpUserEmail,
    signInUserEmail,
    signOutUser,
  };
}

const onAuthStateChanged = auth => cb => auth.onAuthStateChanged(cb);

const createUserWithEmailAndPassword = auth => payload => {
  const { email, password } = payload;
  return auth.createUserWithEmailAndPassword(email, password);
}

const signInWithEmailAndPassword = auth => payload => {
  const { email, password } = payload;
  return auth.signInWithEmailAndPassword(email, password);
}

const signOut = auth => () => auth.signOut();
