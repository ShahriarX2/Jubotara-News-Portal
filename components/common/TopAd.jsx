"use client";

import { useEffect, useRef } from "react";

const TopAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key' : 'e58ebcaf5a7dce5e6ba9b074f5e7e675',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;
      adRef.current.appendChild(configScript);

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highperformanceformat.com/e58ebcaf5a7dce5e6ba9b074f5e7e675/invoke.js";
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className="flex items-center justify-center min-h-[90px] w-full overflow-hidden"
    >
      {/* The ad will be injected here */}
    </div>
  );
};

export default TopAd;
