import React, { useState } from "react";
import QRForm from "./components/QRForm";
import QRResult from "./components/QRResult";

function App() {
  const [qrPath, setQrPath] = useState("");
  const [params, setParams] = useState(null);

  const handleGenerate = async (formData, rawParams) => {
    try {
      const res = await fetch("http://localhost:8080/qrcodes/generate", {
        method: "POST",
        body: formData, 
      });

      const text = await res.text();

      if (res.ok) {
        setQrPath(text); 
        setParams(rawParams);
      } else {
        alert("Ошибка: " + text);
      }
    } catch (err) {
      alert("Ошибка при соединении с сервером");
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center p-8 bg-gray-100">
      <div className="flex flex-col lg:flex-row gap-8 w-full max-w-6xl">
        <div className="w-full lg:w-1/2">
          <QRForm onGenerate={handleGenerate} setParams={setParams} />
        </div>
        <div className="w-full lg:w-1/2">
          <QRResult path={qrPath} params={params} />
        </div>
      </div>
    </div>
  );
}

export default App;
