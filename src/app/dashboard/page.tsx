"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth } from "../../lib/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";

interface DataCard {
  title: string;
  subtitle: string;
  description: string;
}

interface SaleItem {
  name: string;
  email: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter(); // Hook para la navegación

  const dataCards: DataCard[] = [
    {
      title: "Total revenue 1",
      subtitle: "$45,231.89",
      description: "+20.1% from last month",
    },
    {
      title: "Total revenue 2",
      subtitle: "$50,231.89",
      description: "+96% from last month",
    },
    {
      title: "Total revenue 3",
      subtitle: "$40,231.89",
      description: "+10% from last month",
    },
    {
      title: "Total revenue 4",
      subtitle: "$80,231.89",
      description: "+2.5% from last month",
    },
  ];

  const recentSales: SaleItem[] = [
    { name: "Maricela Fuentes", email: "maricela@example.com" },
    { name: "John Doe", email: "john@example.com" },
    { name: "Jane Smith", email: "jane@example.com" },
    { name: "Alice Johnson", email: "alice@example.com" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("CU: ", currentUser);
        setUser(currentUser.email || "Usuario");
      } else {
        router.push("/auth/login"); // Redirige a la página de inicio de sesión si no hay usuario
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login"); // Redirige a la página de inicio de sesión
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <section>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Edi The Barber</h1>
          <div className="flex items-center space-x-2">
            <span className="material-icons">👤</span>
            <p>{user}</p>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={() => handleLogout()}
            >
              Cerrar sesión
            </button>
          </div>
        </div>
        <div className="mb-4">
          <button className="bg-green-500 text-white px-4 py-2 rounded">
            <Link href={"/payment"}>Generar pago</Link>
          </button>
        </div>
        <div className="mb-4 mt-4 border-t-2 border-slate-400"> </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          {dataCards.map(({ title, subtitle, description }, index) => (
            <div key={index} className="bg-white p-4 shadow rounded">
              <div className="flex justify-between items-center mb-2">
                <p className="mb-2">{title}</p>
                <p className="text-xl font-bold">$</p>
              </div>
              <p className="mb-2">{subtitle}</p>
              <p>{description}</p>
            </div>
          ))}
        </div>
        <section>
          <div className="mt-2 border-t-2 border-slate-400 flex flex-col md:flex-row items-center">
            <img
              src="https://tudashboard.com/wp-content/uploads/2021/06/barras_apiladas-2020-09-29_16-27-24.jpg"
              alt="Bar chart displaying revenue data"
              width="45%"
              className="mb-4 mt-5 md:mb-0 md:mr-4"
            />
            <div className="w-full">
              <h2 className="text-xl font-bold">Pagos recientes</h2>
              <p className="text-lg">You made 265 sales this month</p>
              <div className="grid grid-cols-1 gap-2 mt-2">
                {recentSales.map(({ name, email }, index) => (
                  <div
                    key={index}
                    className="flex justify-between p-4 shadow rounded"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="material-icons">🥹</span>
                      <p>{name}</p>
                      <p>{email}</p>
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
};

export default Dashboard;
