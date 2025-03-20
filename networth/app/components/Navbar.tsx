"use client";
import Image from 'next/image';
import Link from 'next/link';

interface NavbarProps {
  logoSrc?: string;
  logoAlt?: string;
  brandName?: string;
  brandColor?: string;
  ctaText?: string;
  ctaColor?: string;
  ctaHoverColor?: string;
}

const Navbar = ({
  logoSrc = "/assets/Referrly-Icon.webp",
  logoAlt = "Referrlyy Logo",
  brandName = "Referrlyy",
  brandColor = "#118B50",
  ctaText = "Get the App",
  ctaColor = "#118B50",
  ctaHoverColor = "#0f753a"
}: NavbarProps) => {
  return (
    <header className="w-full py-4 px-8">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <div className="flex items-center">
          <div className="w-12 h-12 relative mr-2">
            <Image 
              src={logoSrc} 
              alt={logoAlt} 
              width={48} 
              height={48}
            />
          </div>
          <h1 className={`text-2xl font-bold text-[${brandColor}]`}>{brandName}</h1>
        </div>
        <nav className="flex items-center">
          <Link href="#" className="text-black font-medium mr-8">How it works</Link>
          <button className={`bg-[${ctaColor}] text-white font-medium px-4 py-2 rounded-md hover:bg-[${ctaHoverColor}] transition-colors`}>
            {ctaText}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;