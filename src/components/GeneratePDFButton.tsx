import { useState } from "react";
import html2pdf from "html2pdf.js";

const GeneratePdfPage: React.FC = () => {
  const [qrCode, setQrCode] = useState<string>(""); // Variable para QR Code

  const generatePDF = () => {
    const element = document.getElementById("content");
    if (!element) return;

    const options = {
      margin: 0.5,
      filename: "generated.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    html2pdf().from(element).set(options).save();
  };

  return (
    <div>
      <input
        type="text"
        value={qrCode}
        onChange={(e) => setQrCode(e.target.value)}
        placeholder="Enter QR Code URL"
      />
      <button onClick={generatePDF}>Generate PDF</button>

      <div id="content" style={{ display: "none" }}>
        <html>
          <head>
            <title>Maqueta de Barberia</title>
            <style>
              {`
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

                .with-line {
                  position: relative;
                  margin-left: 20px;
                  text-align: left;
                }

                .with-line::before {
                  content: "";
                  position: absolute;
                  left: 50%;
                  top: 50%;
                  width: 65%;
                  height: 1px;
                  background-color: #000;
                  transform: translate(-50%, -50%);
                }
              `}
            </style>
          </head>
          <body>
            <section>
              <div className="container">
                <div className="image-container">
                  <img
                    src="https://images.pexels.com/photos/4952628/pexels-photo-4952628.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Imagen"
                  />
                  <img
                    src="https://images.pexels.com/photos/4952628/pexels-photo-4952628.jpeg?auto=compress&cs=tinysrgb&w=400"
                    alt="Imagen"
                  />
                </div>
                <div className="data-container">
                  <h1>EDI THE BARBER PROFESIONAL</h1>
                  <h2>
                    RFC: DOAE870303U84 <br />
                    FRAY BARTOLOME DE LAS CASAS 24, INT.23 Y 24, COL.CENTRO,{" "}
                    <br />
                    CUERNAVACA MORELOS, C.P.62000
                  </h2>
                  <p className="with-line">Nombre:</p>
                  <p className="with-line">Concepto:</p>
                  <p className="with-line">Fecha:</p>
                  <p className="with-line">Total:</p>
                </div>
                <div className="image-container-right">
                  <img
                    src={qrCode || "default-image-url"}
                    alt="Imagen Derecha"
                  />
                </div>
              </div>
            </section>
          </body>
        </html>
      </div>
    </div>
  );
};

export default GeneratePdfPage;
