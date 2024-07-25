import React from "react";

export default function Page() {
  return (
    <section className="flex items-center justify-center min-h-screen bg-blue-600">
    
      <div className="flex space-x-8  p-8 rounded-lg shadow-lg">
        {/* Imagen */}
        <div className="w-1/2 flex justify-start">
          <img src="https://images.pexels.com/photos/4952628/pexels-photo-4952628.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Example" className="w-64 h- object-cover rounded-lg shadow-lg" />
        </div>

        {/* Formulario */}
        <div className="w-1/2 ">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQryDa73unRex1DSh__Lpuw_ihLbjROfFhhA&s" alt="logo" width={"150px"} className="mx-12"/>
          <h2 className="text-center text-2xl font-bold mb-10">Barberia</h2>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
               UserName
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="UserName"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
               Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>

    </section>
  );
}
