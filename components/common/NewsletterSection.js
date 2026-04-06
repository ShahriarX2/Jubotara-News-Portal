"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/fetchData";
import Container from "@/components/common/Container";

export default function NewsletterSection({ showContainer = true, showSection = true, compact = false }) {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: "" });

        const result = await subscribeNewsletter(email);

        if (result?.success) {
            setStatus({ loading: false, success: true, error: "" });
            setEmail("");
        } else {
            setStatus({
                loading: false,
                success: false,
                error: result?.message || "Something went wrong. Please try again later.",
            });
        }
    };

    if (compact) {
        return (
            <div className="space-y-3">
                {!status.success && (
                    <p className="text-sm text-gray-700">
                        দেশ-বিদেশের সর্বশেষ সংবাদ সরাসরি আপনার ইনবক্সে পেতে সাবস্ক্রাইব করুন।
                    </p>
                )}
                {status.success ? (
                    <div className="bg-green-100 text-green-800 p-3 rounded-md text-sm animate-pulse">
                        সাবস্ক্রাইব করার জন্য ধন্যবাদ!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                        <input
                            type="email"
                            required
                            placeholder="আপনার ইমেইল"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 text-sm rounded-md border border-gray-300 focus:ring-1 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={status.loading}
                            className={`bg-primary text-white px-4 py-2 rounded-md text-sm font-bold transition-all hover:bg-opacity-90 active:scale-95 ${
                                status.loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {status.loading ? "অপেক্ষা করুন..." : "সাবস্ক্রাইব"}
                        </button>
                        
                        {status.error && (
                            <p className="text-[10px] text-red-600">
                                {status.error}
                            </p>
                        )}
                    </form>
                )}
            </div>
        );
    }

    const content = (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">আমাদের নিউজলেটারে সাবস্ক্রাইব করুন</h2>
                <p className="text-gray-600">দেশ-বিদেশের সর্বশেষ সংবাদ সরাসরি আপনার ইনবক্সে পেতে আজই সাবস্ক্রাইব করুন।</p>
            </div>
            
            <div className="flex-1 w-full">
                {status.success ? (
                    <div className="bg-green-100 text-green-800 p-4 rounded-md text-center animate-pulse">
                        সাবস্ক্রাইব করার জন্য ধন্যবাদ!
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
                        <input
                            type="email"
                            required
                            placeholder="আপনার ইমেইল এড্রেস"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                        />
                        <button
                            type="submit"
                            disabled={status.loading}
                            className={`bg-primary text-white px-8 py-3 rounded-md font-bold transition-all hover:bg-opacity-90 active:scale-95 ${
                                status.loading ? "opacity-70 cursor-not-allowed" : ""
                            }`}
                        >
                            {status.loading ? "অপেক্ষা করুন..." : "সাবস্ক্রাইব"}
                        </button>
                        
                        {status.error && (
                            <p className="absolute -bottom-6 left-0 text-xs text-red-600 mt-1">
                                {status.error}
                            </p>
                        )}
                    </form>
                )}
            </div>
        </div>
    );

    if (!showSection) {
        return showContainer ? <Container>{content}</Container> : content;
    }

    return (
        <section className="bg-gray-100 py-12">
            {showContainer ? <Container>{content}</Container> : content}
        </section>
    );
}
