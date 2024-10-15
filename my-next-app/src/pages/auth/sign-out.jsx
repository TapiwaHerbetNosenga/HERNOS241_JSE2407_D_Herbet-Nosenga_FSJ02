
import { useEffect } from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useRouter } from 'next/router';
import { app } from '@/firebaseConfig';

const SignOut = () => {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        router.push('/'); 
      })
      .catch((error) => {
        console.error('Error during sign out:', error);
      });
  }, [router]);

  return (
    <div>
      <h1>Signing you out...</h1>
    </div>
  );
};

export default SignOut;
