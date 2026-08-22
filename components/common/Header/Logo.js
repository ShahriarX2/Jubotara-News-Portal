import Link from 'next/link';
import jtLogo from '@/public/images/logo.png';
import rpcLogo from '@/public/images/rpcLogo.jpg';

const Logo = ({ className }) => {
  const selectedLogo = process.env.FRONTEND_URL === 'https://jubotaranews.com' ? jtLogo : rpcLogo;
  return (
    <Link href="/" className="relative z-60 flex items-center shrink-0">
      <div className={`relative transition-transform duration-200 hover:scale-105 ${className}`}>
        <img
          src={selectedLogo.src || selectedLogo}
          alt="Jubotara News Logo"
          sizes="(max-width: 768px) 150px, 200px"
          className="object-contain absolute inset-0 w-full h-full"
        />
      </div>
    </Link>
  );
};

export default Logo;
