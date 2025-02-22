import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/api/auth/login');
  }

  return (
    <div className="container mx-auto p-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="flex flex-col items-center">
          {session.user.picture && (
            <img 
              src={session.user.picture} 
              alt={session.user.name || 'Profile'} 
              className="h-24 w-24 rounded-full mb-4"
            />
          )}
          <h2 className="text-2xl font-bold mb-2">{session.user.name}</h2>
          <p className="text-gray-600">{session.user.email}</p>
        </div>
      </div>
    </div>
  );
} 