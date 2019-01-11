import { useFirebase } from '../Firebase';
import { useRouter, ROUTES } from '../Router';

export default function LogoutPage() {
  const firebase = useFirebase();
  const router = useRouter();

  firebase.signOut()
    .then(() => router.history.push(ROUTES.HOME))
    .catch(console.log);

  return null;
}
