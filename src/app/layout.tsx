import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify"; // Importar ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Importar los estilos de react-toastify

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edi The Barber",
  description: "Edi The Barber Payments Page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <ToastContainer /> {/* Agregar ToastContainer aquí */}
      </body>
    </html>
  );
}
