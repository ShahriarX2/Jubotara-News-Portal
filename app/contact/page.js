"use client";

import { useState } from "react";
import { submitContactForm } from "@/lib/fetchData";
import Container from "@/components/common/Container";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [status, setStatus] = useState({
        loading: false,
        success: false,
        error: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ loading: true, success: false, error: "" });

        const result = await submitContactForm(formData);

        if (result?.success) {
            setStatus({ loading: false, success: true, error: "" });
            setFormData({ name: "", email: "", subject: "", message: "" });
        } else {
            setStatus({
                loading: false,
                success: false,
                error: result?.message || "Something went wrong. Please try again later.",
            });
        }
    };

    return (
        <Container>
            <div className="py-12 max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold mb-8 text-center border-b-4 border-primary w-fit mx-auto pb-2">
                    যোগাযোগ করুন
                </h1>
                
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
                    {status.success ? (
                        <div className="bg-green-100 text-green-800 p-4 rounded-md mb-6 text-center">
                            আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {status.error && (
                                <div className="bg-red-100 text-red-800 p-4 rounded-md text-center">
                                    {status.error}
                                </div>
                            )}
                            
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    আপনার নাম *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="এখানে লিখুন"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    আপনার ইমেইল *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="example@mail.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                                    বিষয়
                                </label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="বার্তার বিষয়"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                                    বার্তা *
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="5"
                                    required
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary outline-none transition-all"
                                    placeholder="আপনার বার্তা এখানে লিখুন..."
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className={`w-full bg-primary text-white py-3 px-6 rounded-md font-bold transition-all hover:bg-opacity-90 ${
                                    status.loading ? "opacity-70 cursor-not-allowed" : ""
                                }`}
                            >
                                {status.loading ? "পাঠানো হচ্ছে..." : "বার্তা পাঠান"}
                            </button>
                        </form>
                    )}
                </div>

                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">আমাদের ঠিকানা</h3>
                        <p className="text-gray-600">গাইবান্ধা সদর, গাইবান্ধা।</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                        <h3 className="font-bold text-lg mb-2">ইমেইল করুন</h3>
                        <p className="text-gray-600">jubotaranews@gmail.com</p>
                    </div>
                </div>
            </div>
        </Container>
    );
}
