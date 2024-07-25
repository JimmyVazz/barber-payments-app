import React from "react";

export default function page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative">
         <button className="self-start mt-24  bg-green-500 text-white px-4 py-2 rounded absolute left-20 top-0 bottom-0 ">
        Regresar al Dashboard
      </button>
      <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-lg ">
        <h1 className="text-3xl font-bold mb-6 text-center">Profile</h1>
        <form className="flex flex-col md:flex-row">
          <div className="flex-1 md:pr-6">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                UserName
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                E-Mail
              </label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center md:pl-6">
            <img
              src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 object-cover"
            />
            <button
              type="submit"
              className="bg-green-500 text-white  px-10 py-2 rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
