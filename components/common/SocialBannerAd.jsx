"use client";

import { useEffect, useRef } from "react";

const SocialBannerAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = "https://pl29096988.profitablecpmratenetwork.com/8e/dc/5a/8edc5ae793dd52918370eb56e4b85cab.js";
      script.async = true;
      adRef.current.appendChild(script);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className="social-banner-ad-container"
    >
      {/* The ad script will be injected here */}
    </div>
  );
};

export default SocialBannerAd;
