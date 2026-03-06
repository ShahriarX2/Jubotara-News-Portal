import Link from 'next/link';
import Image from 'next/image';
import logoImg from '@/public/images/logo.png';

const Logo = ({ logoUrl }) => {


  // console.log('logoUrl', logoUrl)
  return (
    <Link href="/" className="hidden md:block relative z-[60] ">
      <div className="w-[100px] h-[90px] flex items-center justify-center transition-transform duration-200 hover:scale-105">
        <Image
          src={logoUrl}
          alt="Bangla Star Logo"
          width={97}
          height={80}
          priority
          className="object-contain"
        />
      </div>
    </Link>
  );
};

export default Logo;