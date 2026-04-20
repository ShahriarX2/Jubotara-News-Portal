import Link from 'next/link';
import logoImg from '@/public/images/logo.png';

const Logo = ({ logoUrl, className }) => {
  return (
    <Link href="/" className="relative z-60 flex items-center shrink-0">
      <div className={`relative transition-transform duration-200 hover:scale-105 ${className}`}>
        <img
          src={logoUrl || logoImg.src || logoImg}
          alt="Jubotara News Logo"
          sizes="(max-width: 768px) 150px, 200px"
          className="object-contain absolute inset-0 w-full h-full"
        />
      </div>
    </Link>
  );
};

export default Logo;
