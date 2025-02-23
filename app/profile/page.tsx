import { getSession } from '@auth0/nextjs-auth0';
import { redirect } from 'next/navigation';
import { alice, vastago } from '../fonts';

const GradientText = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-block bg-gradient-to-r from-[#A07CFE] via-[#FE8FB5] to-[#FFBE7B] bg-clip-text text-transparent animate-gradient">
    {children}
  </span>
);

export default async function ProfilePage() {
  const session = await getSession();

  if (!session?.user) {
    redirect('/api/auth/login');
  }

  return (
    <div className={`min-h-screen bg-[#1a1a1a] pt-24 ${alice.variable} ${vastago.variable}`}>
      <div className="max-w-4xl mx-auto px-8">
        <h1 className={`${alice.className} text-4xl font-bold text-white text-center mb-12`}>
          Your <GradientText>Profile</GradientText>
        </h1>
        
        <div className="bg-[#252525] rounded-xl shadow-lg overflow-hidden border border-[#2a2a2a]">
          {/* Profile Header */}
          <div className="p-8 flex flex-col items-center border-b border-[#2a2a2a]">
            {session.user.picture && (
              <div className="relative h-24 w-24 mb-6 ring-2 ring-rose-400/30 rounded-full overflow-hidden">
                <img 
                  src={session.user.picture} 
                  alt={session.user.name || 'Profile'} 
                  className="h-full w-full object-cover"
                />
              </div>
            )}
            <h2 className={`${vastago.className} text-2xl font-bold text-white mb-2`}>
              {session.user.name}
            </h2>
            <p className="text-[#666666]">{session.user.email}</p>
          </div>

          {/* Profile Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#2a2a2a]">
            <div className="p-6 text-center">
              <p className="text-[#666666] text-sm mb-1">Practice Sessions</p>
              <p className={`${vastago.className} text-2xl font-bold text-white`}>0</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-[#666666] text-sm mb-1">Average Score</p>
              <p className={`${vastago.className} text-2xl font-bold text-white`}>N/A</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-[#666666] text-sm mb-1">Companies Practiced</p>
              <p className={`${vastago.className} text-2xl font-bold text-white`}>0</p>
            </div>
          </div>

          {/* Account Info */}
          <div className="p-8 border-t border-[#2a2a2a]">
            <h3 className={`${vastago.className} text-lg font-semibold text-white mb-4`}>
              Account Information
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-[#666666] text-sm">Account ID</p>
                <p className="text-white font-mono text-sm">{session.user.sub}</p>
              </div>
              <div>
                <p className="text-[#666666] text-sm">Last Updated</p>
                <p className="text-white text-sm">{session.user.updated_at || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 