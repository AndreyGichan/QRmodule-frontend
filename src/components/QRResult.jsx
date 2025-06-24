import React, { useState } from "react";

export default function QRResult({ path, params }) {

  const fileName = path.split("\\").pop().split("/").pop();
  const baseName = fileName.replace(/\.[^/.]+$/, ""); 
  const previewUrl = baseName
    ? `http://localhost:8080/qrcodes/download?fileName=${encodeURIComponent(baseName)}.png`
    : "/example-qr.png";
  const [selectedFormat, setSelectedFormat] = useState("png");

  const handleDownload = () => {
    if (!params) {
      alert("Нет параметров для генерации");
      return;
    }

    const formData = new FormData();
    formData.append("content", params.content);
    formData.append("format", selectedFormat);
    formData.append("fileName", params.fileName);
    formData.append("foregroundColor", params.foregroundColor);
    formData.append("backgroundColor", params.backgroundColor);
    if (params.logoFile) {
      formData.append("logo", params.logoFile);
    }

    fetch("http://localhost:8080/qrcodes/generate", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((errMsg) => {
            throw new Error(errMsg);
          });
        }
        return res.text(); 
      })
      .then((generatedFileName) => {
        const downloadUrl = `http://localhost:8080/qrcodes/download?fileName=${encodeURIComponent(generatedFileName)}`;
        const a = document.createElement("a");
        a.href = downloadUrl;
        a.download = generatedFileName;
        document.body.appendChild(a);
        a.click();
        a.remove();
      })
      .catch((err) => {
        console.error("Ошибка при скачивании:", err);
        alert("Не удалось скачать файл: " + err.message);
      });
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow text-center">
      <h3 className="text-lg font-semibold mb-4 text-belpostBlue">Ваш QR-код:</h3>

      {path ? (
        <img
          src={previewUrl}
          alt="QR Code"
          className="mx-auto mb-4 max-w-full"
          style={{ maxHeight: "300px" }}
        />
      ) : (
        <div className="mb-4 text-gray-500 italic">
          Здесь появится ваш QR-код
          {/* Либо вместо текста можно показать статичный пример: */}
          {/* <img src="/example-qr.png" alt="Пример QR" className="mx-auto mb-4 max-w-full" style={{ maxHeight: "300px" }} /> */}
        </div>
      )}


      <div className="mb-4">
        <label className="mr-2 font-medium">Формат загрузки:</label>
        <select
          value={selectedFormat}
          onChange={(e) => setSelectedFormat(e.target.value)}
          className="p-2 border rounded"
          disabled={!path} 
        >
          <option value="png">PNG</option>
          <option value="pdf">PDF</option>
          <option value="svg">SVG</option>
        </select>
      </div>

      <button
        onClick={handleDownload}
        className={`bg-belpostBlue text-white px-4 py-2 rounded hover:bg-blue-700 ${
          !path ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={!path} 
      >
        Скачать QR-код
      </button>
    </div>
  );
}
