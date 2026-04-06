import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/public/images/logo.png';

const Logo = ({ logoUrl, className }) => {
  return (
    <Link href="/" className="relative z-60 flex items-center shrink-0">
      <div className={`relative transition-transform duration-200 hover:scale-105 ${className}`}>
        <Image
          src={logoUrl || logoImg}
          alt="Jubotara News Logo"
          fill
          priority
          sizes="(max-width: 768px) 150px, 200px"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
