"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { auth, firestore } from "../../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { Timestamp } from "firebase/firestore";
import Image from "next/image";
import LogoBarber from "../../../public/logo barberia.png";
import "../dashboard/dashboard.css"

interface DataCard {
  title: string;
  subtitle: string;
  description: string;
}

interface SaleItem {
  id: string;
  name: string;
  concept: string;
  total: number;
  date: Date;
  user: string;
}

const Dashboard: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const [recentSales, setRecentSales] = useState<SaleItem[]>([]);
  const router = useRouter();

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

  const fetchLastPayments = async (): Promise<SaleItem[]> => {
    const paymentsRef = collection(firestore, "payments");
    const q = query(paymentsRef, orderBy("date", "desc"), limit(10));

    const querySnapshot = await getDocs(q);
    const payments: SaleItem[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        name: data.name,
        concept: data.concept,
        total: data.total,
        date: (data.date as Timestamp).toDate(), // Convert Firestore Timestamp to JS Date
        user: data.user,
      } as SaleItem;
    });

    return payments;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser.email || "Usuario");
      } else {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [router]);

  useEffect(() => {
    fetchLastPayments()
      .then((data) => setRecentSales(data))
      .catch((error) => console.error("ERROR: ", error));
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/login");
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <section>
    <div className="p-4 md:p-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
      <Image
                src={LogoBarber}
                alt="Logo"
                className="w-24 h-24 rounded-full mb-4 object-cover"
              />
        {/* <h1 className="text-xl md:text-2xl font-bold text-gray-800">Edi The Barber</h1> */}
        <div className="flex items-center space-x-2 mt-2 md:mt-0">
          <span className="material-icons">👤</span>
          <p>{user}</p>
          <button
            className="button-close text-white px-4 py-2 rounded"
            onClick={handleLogout}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
      <div className="mb-4 ">
        <button className="button-page text-white px-4 py-2 rounded">
          <Link href={"/payment"}>Generar pago</Link>
        </button>
      </div>
      <section>
        <div className="mt-2 border-t-2 border-slate-400 flex flex-col md:flex-row">
          <div className="w-full">
            <h2 className="text-lg md:text-xl font-bold text-gray-800">Historial de pagos</h2>
            <div className="grid grid-cols-1 gap-2 mt-2">
              {recentSales.map(({ name, concept, total, id }, index) => (
                <div
                  key={id}
                  className="list-page flex flex-col md:flex-row justify-between p-4 shadow rounded text-gray-800"
                >
                  <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-4">
                    <span className="material-icons">💰</span>
                    <p>Cliente: {name}</p>
                    <p>Concepto: {concept}</p>
                  </div>
                  <div className="mt-2 md:mt-0">
                    <p className="text-lg md:text-xl font-bold">${total}</p>
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
