"use client";

import Link from "next/link";
import Image from "next/image";
import { FC, useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import LogoBarber from "../../../public/logo barberia.png";
import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import { firestore } from "../../lib/firebase";
import { toast } from "react-toastify";
import { generatePdf } from "../../utils/generatePdf"; // Import the PDF generation function
import QRCode from "qrcode";

interface ProfileFormData {
  name: string;
  concept: string;
  total: number;
}

const PaymentPage: FC = () => {
  const [formData, setFormData] = useState<ProfileFormData>({
    name: "",
    concept: "",
    total: 0.0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false); // New state to control visibility

  const router = useRouter(); // Initialize useRouter

  const showToast = () => {
    toast.success("El pago se registró de forma exitosa!");
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true); // Establecer loading a true antes de la solicitud

    try {
      // Añade un nuevo documento con ID generado automáticamente
      const docRef = await addDoc(collection(firestore, "payments"), {
        ...formData,
        date: Timestamp.fromDate(new Date()),
        user: "Maricela",
      });

      // Obtén el ID del documento recién creado
      const newDocId = docRef.id;
      const qr = await QRCode.toDataURL(newDocId);
      showToast();
      generatePdf({
        qrCode: qr,
        name: formData.name,
        concept: formData.concept,
        total: formData.total,
        date: new Date().toLocaleString(),
      }); // Call the PDF generation function

      setIsSuccess(true); // Hide the div on success

      // Redirect to /dashboard after a brief delay
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000); // Adjust the delay as needed
    } catch (err) {
      console.log("ERROR: ", err);
      toast.error("Hubo un problema"); // Notificar sobre el error
    } finally {
      setLoading(false); // Asegurarse de que loading se establezca a false
      setFormData({
        name: "",
        concept: "",
        total: 0.0,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
    {/* Botón "Regresar al inicio" fijado en la parte superior */}
    <Link href="/dashboard">
      <button className="fixed top-1 left-4 bg-green-500 text-white px-4 py-2 rounded z-10">
        Regresar al inicio
      </button>
    </Link>
    
    {/* Contenedor del formulario */}
    <div className="flex items-center justify-center min-h-screen pt-12 pb-6">
      {!isSuccess && (
        <div className="w-full max-w-4xl p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Generador de pagos y recibos
          </h1>
          <form className="flex flex-col md:flex-row" onSubmit={handleSubmit}>
            <div className="flex-1 md:pr-6 mb-6 md:mb-0">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nombre completo
                </label>
                <input
                  required
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Concepto
                </label>
                <select
                  required
                  name="concept"
                  value={formData.concept}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                  <option value="">Selecciona una opción de la lista</option>
                  <option value="Certificado">Certificado</option>
                  <option value="Inscripción">Inscripción</option>
                  <option value="pago mensualidad">Pago mensualidad</option>
                  <option value="Apartado de lugar">Apartado de lugar</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Escribe una Fecha:
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Total
                </label>
                <input
                  required
                  type="number"
                  name="total"
                  value={formData.total}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
  
            <div className="flex-1 flex flex-col items-center justify-center md:pl-6">
              <Image
                src={LogoBarber}
                alt="Logo"
                className="w-32 h-32 rounded-full mb-4 object-cover"
              />
              <button
                disabled={loading}
                type="submit"
                className="bg-green-500 text-white px-6 py-2 rounded mt-4 md:mt-0"
              >
                {loading ? "Cargando ..." : "Guardar pago y obtener recibo"}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  </div>
  

  );
};

export default PaymentPage;
