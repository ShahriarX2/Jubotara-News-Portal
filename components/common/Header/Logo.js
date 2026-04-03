import Image from 'next/image';
import Link from 'next/link';
import logoImg from '@/public/images/logo.png';

const Logo = ({ logoUrl }) => {
  return (
    <Link href="/" className="relative z-[60] flex items-center shrink-0">
      <div className="relative h-[60px] w-[88px] md:h-[72px] md:w-[110px] transition-transform duration-200 hover:scale-105">
        <Image
          src={logoUrl || logoImg}
          alt="Jubotara News Logo"
          fill
          priority
          sizes="(max-width: 768px) 88px, 110px"
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;
