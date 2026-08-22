import Link from "next/link";
import jtLogo from "@/public/images/jtLogo.png";
import rpcLogo from "@/public/images/rpcLogo.jpg";

const Logo = ({ className }) => {
  const siteName = (
    process.env.SITE_NAME ||
    process.env.NEXT_PUBLIC_SITE_NAME ||
    process.env.FRONT_END_URL ||
    process.env.NEXT_PUBLIC_FRONTEND_URL ||
    ""
  ).toLowerCase();

  const isJubotaraSite =
    siteName.includes("jubotara") || siteName.includes("jubotaranews");
  const selectedLogo = isJubotaraSite ? jtLogo : rpcLogo;

  return (
    <Link href="/" className="relative z-60 flex items-center shrink-0">
      <div
        className={`relative transition-transform duration-200 hover:scale-105 ${className}`}
      >
        <img
          src={selectedLogo.src || selectedLogo}
          alt={isJubotaraSite ? "Jubotara News Logo" : "Site Logo"}
          sizes="(max-width: 768px) 150px, 200px"
          className="object-contain absolute inset-0 w-full h-full"
        />
      </div>
    </Link>
  );
};

export default Logo;
