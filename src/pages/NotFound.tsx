import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Home, Search, ArrowLeft, CreditCard } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const cardTilt = {
    transform: `perspective(1000px) rotateX(${(mousePosition.y - window.innerHeight / 2) / 50}deg) rotateY(${(mousePosition.x - window.innerWidth / 2) / 50}deg)`
  };

  return (
    <div className="relative min-h-screen bg-[#fafafa] overflow-hidden">
      {/* Micro-dotted canvas background */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: 'radial-gradient(circle, #d1d5db 1px, transparent 1px)',
        backgroundSize: '20px 20px'
      }}></div>

      {/* Animated floating cards in background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-20 bg-slate-200/30 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-28 h-18 bg-slate-200/30 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-36 h-22 bg-slate-200/30 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: '4s' }}></div>
        <div className="absolute bottom-20 right-1/3 w-30 h-20 bg-slate-200/30 rounded-lg backdrop-blur-sm animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header with logo */}
      <header className="relative z-10 px-6 py-5 border-b border-slate-200/60 bg-white/80 backdrop-blur-sm">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <div className="text-2xl font-bold text-slate-900">
            <span className="text-slate-600">P</span>atra
          </div>
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </button>
        </div>
      </header>


      

      {/* Main content */}
      <main className="relative z-10 flex items-center justify-center min-h-[calc(100vh-73px)] p-6">
        <div className="max-w-2xl w-full text-center">

          {/* Title */}
        <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-3">
              Profile Not Found
            </h2>
        </div>
          
          {/* 3D Card with 404 */}
          <div className="flex justify-center mb-12">
            <div 
              className="relative transition-transform duration-300 ease-out"
              style={cardTilt}
            >
              {/* Main card */}
              <div className="w-80 h-52 bg-gradient-to-br from-slate-800 via-slate-900 to-black rounded-xl shadow-2xl overflow-hidden relative">
                {/* Subtle texture */}
                <div className="absolute inset-0 opacity-5" style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg width="100" height="100" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" /%3E%3C/filter%3E%3Crect width="100" height="100" filter="url(%23noise)" opacity="0.4"/%3E%3C/svg%3E")'
                }}></div>

                {/* CardCraft logo */}
                <div className="absolute top-4 left-4 text-white/90 text-xs font-semibold tracking-wide">
                  Patra
                </div>

                {/* 404 in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-7xl font-bold text-white mb-2 tracking-tight">404</h1>
                    <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
                      <CreditCard className="w-4 h-4" />
                      <span>Card Not Found</span>
                    </div>
                  </div>
                </div>

                {/* Matte finish overlay */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/5 via-transparent to-black/5 pointer-events-none"></div>
              </div>

              {/* Shadow card effect */}
              <div className="absolute -bottom-2 left-4 right-4 h-52 bg-slate-300/20 rounded-xl blur-sm -z-10"></div>
            </div>
          </div>

          {/* Text content */}
          <div className="mb-10">
            <p className="text-slate-600 text-base md:text-lg mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <p className="text-slate-500 text-sm">
              Attempted path: <code className="px-2 py-1 bg-slate-200 rounded text-xs font-mono">{location.pathname}</code>
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="group flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-300 text-slate-700 rounded-lg hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 shadow-sm hover:shadow-md w-full sm:w-auto"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium">Go Back</span>
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="group flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all duration-200 shadow-md hover:shadow-lg w-full sm:w-auto"
            >
              <Home className="w-4 h-4" />
              <span className="font-medium">Go to Home</span>
            </button>
          </div>

          {/* Quick links */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500 mb-4">Looking for something specific?</p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm">
              <button
                onClick={() => navigate('/editor')}
                className="text-slate-600 hover:text-slate-900 transition-colors underline decoration-dotted underline-offset-4"
              >
                Create Your Card
              </button>
              <span className="text-slate-300">•</span>
              <button
                onClick={() => navigate('/analytics')}
                className="text-slate-600 hover:text-slate-900 transition-colors underline decoration-dotted underline-offset-4"
              >
                Your Card Analytics
              </button>
              <span className="text-slate-300">•</span>
              <a
                href="https://cardcraft-omega.vercel.app"
                className="text-slate-600 hover:text-slate-900 transition-colors underline decoration-dotted underline-offset-4"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(2deg);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        code {
          word-break: break-all;
        }

        @media (max-width: 640px) {
          .w-80 {
            width: 280px;
          }
          .h-52 {
            height: 182px;
          }
        }
      `}</style>
    </div>
  );
};

export default NotFound;
