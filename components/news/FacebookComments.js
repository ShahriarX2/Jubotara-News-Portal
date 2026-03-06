'use client';

import React, { useEffect } from 'react';

const FacebookComments = ({ url }) => {
    useEffect(() => {
        // Function to initialize the Facebook SDK
        const initFacebookSDK = () => {
            if (window.FB) {
                window.FB.XFBML.parse();
            }
        };

        // If the script is already there, just re-parse
        if (document.getElementById('facebook-jssdk')) {
            initFacebookSDK();
            return;
        }

        // Add the script to the body if not present
        const script = document.createElement('script');
        script.id = 'facebook-jssdk';
        script.src = 'https://connect.facebook.net/bn_BD/sdk.js#xfbml=1&version=v19.0';
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        document.body.appendChild(script);

        script.onload = initFacebookSDK;
    }, [url]);

    return (
        <div className="mt-8 bg-white p-4 border border-slate-300 rounded-sm min-h-[200px]">
            {/* FB Root is required by the SDK to function correctly */}
            <div id="fb-root"></div>

            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
                মন্তব্য করুন
            </h3>

            {/* 
                Facebook requires a valid, public URL for the comment box to appear. 
                On localhost, this may be blank or show a warning.
            */}
            <div
                className="fb-comments"
                data-href={url}
                data-width="100%"
                data-numposts="5"
                data-order-by="reverse_time"
            ></div>
        </div>
    );
};

export default FacebookComments;
