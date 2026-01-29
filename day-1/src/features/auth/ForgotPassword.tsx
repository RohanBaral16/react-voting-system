import { Link } from "react-router-dom";
import { MdInfo } from "react-icons/md";

export default function ForgotPassword() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full">
            <MdInfo className="text-blue-600 dark:text-blue-400 text-5xl" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
          Feature Not Available
        </h1>

        <p className="text-gray-600 dark:text-gray-400 mb-6">
          The password reset feature is currently not available. Please contact
          support for assistance with your account.
        </p>

        <div className="space-y-3">
          <a
            href="mailto:support@example.com"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Contact Support
          </a>

          <Link
            to="/login"
            className="block w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 font-medium py-3 px-4 rounded-lg transition duration-200"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
