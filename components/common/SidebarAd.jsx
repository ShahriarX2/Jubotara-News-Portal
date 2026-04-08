"use client";

import { useEffect, useRef } from "react";

const SidebarAd = () => {
  const adRef = useRef(null);

  useEffect(() => {
    if (adRef.current && !adRef.current.firstChild) {
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key' : '5ce9c6f36f4aed21aec28f4c08615ff1',
          'format' : 'iframe',
          'height' : 250,
          'width' : 300,
          'params' : {}
        };
      `;
      adRef.current.appendChild(configScript);

      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highperformanceformat.com/5ce9c6f36f4aed21aec28f4c08615ff1/invoke.js";
      adRef.current.appendChild(invokeScript);
    }
  }, []);

  return (
    <div
      ref={adRef}
      className="flex items-center justify-center min-h-[250px] w-full overflow-hidden"
    >
      {/* The ad will be injected here */}
    </div>
  );
};

export default SidebarAd;
