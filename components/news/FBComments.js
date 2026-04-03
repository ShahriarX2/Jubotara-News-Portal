'use client';

import { useEffect } from 'react';

const FBComments = ({ url }) => {
    useEffect(() => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }
    }, [url]);

    return (
        <div className="mt-12 bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold mb-6 border-b pb-2">আপনার মতামত দিন</h3>

            <div className="bg-blue-50 border border-blue-100 p-4 rounded text-sm text-blue-800 mb-6">
                <p>ফেসবুক কমেন্ট প্লাগইন এখানে প্রদর্শিত হবে। ডেমো সংস্করণে এই অংশটি সিমুলেট করা হয়েছে।</p>
            </div>

            <div className="space-y-6">
                <div className="flex gap-4">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
                    <div className="flex-1">
                        <textarea
                            className="w-full border border-slate-300 rounded p-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            placeholder="একটি মন্তব্য লিখুন..."
                            rows="3"
                        ></textarea>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm font-bold">Post</button>
                    </div>
                </div>

                <div className="space-y-4 pt-4 border-t border-gray-50">
                    <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                        <div>
                            <h4 className="text-sm font-bold text-blue-600">আব্দুর রহমান</h4>
                            <p className="text-sm text-gray-700">খুবই চমৎকার একটি প্রতিবেদন। তথ্যবহুল এবং সময়োপযোগী। ধন্যবাদ যুবতারা নিউজকে!</p>
                            <div className="flex gap-3 text-[10px] text-gray-500 mt-1">
                                <button className="hover:underline">Like</button>
                                <button className="hover:underline">Reply</button>
                                <span>২ ঘণ্টা আগে</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* <div className="fb-comments" data-href={url} data-width="100%" data-numposts="5"></div> */}
        </div>
    );
};

export default FBComments;
