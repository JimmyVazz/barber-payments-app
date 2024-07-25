import React from "react";

export default function page() {
  const dataCards: object[] = [
    {
      title: "Total revenue 1",
      subtitle: "$45,231.89",
      description: "+20.1% from last month"
    },
    {
      title: "Total revenue 2",
      subtitle: "$50,231.89",
      description: "+96% from last month"
    },
    {
      title: "Total revenue 3",
      subtitle: "$40,231.89",
      description: "+10% from last month"
    },
    {
      title: "Total revenue 4",
      subtitle: "$80,231.89",
      description: "+2.5% from last month"
    }
  ];

  return (
    <section>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <span className="material-icons">👤</span>
            <p>Maricela Fuentes</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">
              Mi Perfil
            </button>
          </div>
        </div>
        <div className="mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            Generar pago
          </button>
        </div>
        <div className="mb-4 mt-4 border-t-2 border-slate-400"> </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {dataCards.map((data: any, i: number) => (
            <div key={i} className="bg-white p-4 shadow rounded">
              <div className="flex justify-between items-center mb-2">
                <p className="mb-2">{data.title} </p>
                <p className="text-xl font-bold">$</p>
              </div>
              <p className="mb-2">{data.subtitle}</p>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
        <section>
          <div className=" mt-2 border-t-2 border-slate-400  flex flex-col md:flex-row items-center">
            <img
              src="https://tudashboard.com/wp-content/uploads/2021/06/barras_apiladas-2020-09-29_16-27-24.jpg"
              alt="Placeholder"
              width={"45%"}
              className="mb-4 mt-5 md:mb-0 md:mr-4 "
            />
            <div className="w-full">
              <h2 className="text-xl font-bold">Recent Sales</h2>
              <p className="text-lg">You mde 265 sales this month</p>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="flex justify-between p-4 shadow rounded "
                  >
                    <div className="flex items-center space-x-4">
                      <span className="material-icons">🥹</span>
                      <p>Maricela Fuentes</p>
                      <p>marisel@gmail.com</p>
                    </div>
                    <div>
                      <p className="text-xl font-bold">$</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
