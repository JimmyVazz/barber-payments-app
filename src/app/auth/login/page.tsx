"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { auth } from "../../../lib/firebase";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Image from "next/image";
import LogoBarber from "../../../../public/logo barberia.png";
import "react-toastify/dist/ReactToastify.css";
import "./page.css";

export default function Page() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter(); // Hook para la navegación

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    if (id === "email") setEmail(value);
    if (id === "password") setPassword(value);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Inicio de sesión exitoso");
      router.push("/dashboard");
    } catch (error) {
      toast.error("Error en el inicio de sesión: " + (error as Error).message);
    } finally {
      setLoading(false);
      setEmail("");
      setPassword("");
    }
  };

  return (
    <section className=" section-login flex items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg ">
        <div className="flex flex-col items-center">
          <Image
            src={LogoBarber}
            alt="Logo"
            className="w-32 h-32 rounded-full mb-4 object-cover"
          />
          <h2 className=" title-login text-2xl font-bold mb-6 ">Barbería</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className=" label-login block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Correo
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Escribe tu correo"
              value={email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="w-full  hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Cargando..." : "Iniciar sesión"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
