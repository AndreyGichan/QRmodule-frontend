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
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-0 overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-100 text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          Ваш QR-код
        </h3>
        <p className="text-sm text-gray-600">{path ? "Готов к скачиванию" : "Здесь появится ваш QR-код"}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* QR Code Preview */}
        <div className="flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-white p-4 rounded-lg">
              {path ? (
                <img
                  src={previewUrl || "/placeholder.svg"}
                  alt="QR Code"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: "300px", maxWidth: "300px" }}
                />
              ) : (
                <div className="w-60 h-60 bg-gray-100 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300">
                  <div className="text-center text-gray-500">
                    <svg
                      className="h-12 w-12 mx-auto mb-2 opacity-50"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <p className="text-sm">Предварительный просмотр</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Format Selection */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700">Формат загрузки:</label>
          <select
            value={selectedFormat}
            onChange={(e) => setSelectedFormat(e.target.value)}
            disabled={!path}
            className="w-full h-10 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="png">🖼️ PNG - Растровое изображение</option>
            <option value="pdf">📄 PDF - Документ</option>
            <option value="svg">⚡ SVG - Векторная графика</option>
          </select>
        </div>

        {/* Download Button */}
        <button
          onClick={handleDownload}
          disabled={!path}
          className={`w-full h-10 text-base font-semibold rounded-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2 ${
            path
              ? "bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white hover:shadow-xl"
              : "bg-gray-400 text-gray-600 cursor-not-allowed"
          }`}
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 10v6m0 0l-4-4m4 4l4-4m-6 4h8a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
          {path ? "Скачать QR-код" : "Сначала создайте QR-код"}
        </button>

        {/* Parameters Display */}
        {path && params && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
            <h4 className="font-semibold text-gray-00 mb-2">Параметры:</h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Содержимое:</strong> {params.content}
              </p>
              <div className="flex items-center gap-2">
                <strong>Цвета:</strong>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: params.foregroundColor }}></div>
                  <span>/</span>
                  <div className="w-4 h-4 rounded border" style={{ backgroundColor: params.backgroundColor }}></div>
                </div>
              </div>
              {params.logoFile && (
                <p>
                  <strong>Логотип:</strong> {params.logoFile.name}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
