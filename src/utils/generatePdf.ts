import { Timestamp } from "firebase/firestore";
import LogoBarber from "../../../public/logo barberia.png";

interface GeneratePdfOptions {
  qrCode: string;
  name: string;
  concept: string;
  total: number;
  date: string | Timestamp;
}

export const generatePdf = (options: GeneratePdfOptions) => {
  const { qrCode, name, concept, total, date } = options;

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            margin: 0;
            padding: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            background-color: #f4f4f4;
            font-family: Arial, sans-serif;
          }
          .container {
            display: grid;
            grid-template-columns: 1fr 2fr 1fr;
            align-items: center;
            width: 100%;
            background-color: white;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .image-container,
          .image-container-right {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          img {
            width: 250px;
            height: 200px;
            object-fit: cover;
          }
          .image-container img,
          .image-container-right img {
            max-width: 100%;
            margin-bottom: 10px;
          }
          .data-container {
            text-align: center;
          }
          h1 {
            font-size: 24px;
            text-align: center;
            margin-top: -40px;
          }
          h2 {
            font-size: 0.8em;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 50px;
          }
        </style>
      </head>
      <body>
        <section>
          <div class="container">
            <div class="image-container">
              <img src="https://images.pexels.com/photos/4952628/pexels-photo-4952628.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Imagen" />
              <img src="https://images.pexels.com/photos/4952628/pexels-photo-4952628.jpeg?auto=compress&cs=tinysrgb&w=400" alt="Imagen" />
            </div>
            <div class="data-container">
              <h1>EDI THE BARBER PROFESIONAL</h1>
              <h2>
                RFC: DOAE870303U84 <br />
                FRAY BARTOLOME DE LAS CASAS 24, INT.23 Y 24, COL.CENTRO, <br />
                CUERNAVACA MORELOS, C.P.62000
              </h2>
              <p class="with-line">Nombre: ${name}</p>
              <p class="with-line">Concepto: ${concept}</p>
              <p class="with-line">Fecha: ${date}</p>
              <p class="with-line">Total: ${total}</p>
            </div>
            <div class="image-container-right">
              <img src="${
                qrCode || "default-image-url"
              }" alt="Imagen Derecha" />
            </div>
          </div>
        </section>
      </body>
    </html>
  `;

  const element = document.createElement("div");
  element.innerHTML = htmlContent;
  document.body.appendChild(element);

  // Print the content

  // Optionally remove the element after printing
  setTimeout(() => {
    window.print();
    document.body.removeChild(element);
  }, 1000); // Adjust delay as needed to ensure printing completes
};
