import { useState } from "react";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: Just show success message
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50/30 dark:bg-gray-900/30 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">
            Contact Us
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Get in touch with the Election Commission of Nepal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Get In Touch
              </h2>

              {/* Email */}
              <div className="flex items-start mb-6">
                <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
                  <MdEmail className="text-blue-600 dark:text-blue-400 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Email
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    support@ecn.gov.np
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    info@ecn.gov.np
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start mb-6">
                <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
                  <MdPhone className="text-green-600 dark:text-green-400 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Phone
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Helpline: 1660-01-45678
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Office: +977-1-4200000
                  </p>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start mb-6">
                <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
                  <MdLocationOn className="text-purple-600 dark:text-purple-400 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Address
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Election Commission of Nepal
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Kantipath, Kathmandu
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">Nepal</p>
                </div>
              </div>

              {/* Office Hours */}
              <div className="flex items-start">
                <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
                  <MdAccessTime className="text-orange-600 dark:text-orange-400 text-2xl" />
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                    Office Hours
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sunday - Friday: 10:00 AM - 5:00 PM
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    Saturday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Follow Us
              </h2>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors"
                >
                  <FaFacebook className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-lg transition-colors"
                >
                  <FaTwitter className="text-2xl" />
                </a>
                <a
                  href="#"
                  className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-lg transition-colors"
                >
                  <FaLinkedin className="text-2xl" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Send us a Message
            </h2>

            {submitted && (
              <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-700 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg mb-6">
                <p className="font-medium">Success!</p>
                <p className="text-sm">
                  Your message has been sent. We'll get back to you soon.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is this regarding?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Write your message here..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              >
                Send Message
              </button>
            </form>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4 text-center">
              * Required fields
            </p>
          </div>
        </div>

        {/* Emergency Notice */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            📞 Emergency Support
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            For urgent election-related issues during voting hours, please call
            our 24/7 emergency helpline at{" "}
            <span className="font-semibold">1660-01-45678</span> or visit your
            nearest local election office.
          </p>
        </div>
      </div>
    </div>
  );
}
