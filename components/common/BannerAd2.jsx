"use client";

import { useEffect, useRef } from "react";

const BannerAd2 = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key' : '6bab26e57ed307caa1363f7e7ce71d64',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      adRef.current.appendChild(configScript);

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highperformanceformat.com/6bab26e57ed307caa1363f7e7ce71d64/invoke.js";
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className="flex items-center justify-center min-h-[50px] w-full overflow-hidden"
    >
      {/* The ad will be injected here */}
    </div>
  );
};

export default BannerAd2;
