import React, { useState, useRef } from "react";

export default function QRForm({ onGenerate, setParams }) {
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [foregroundColor, setForegroundColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [logoFile, setLogoFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("content", content);
        formData.append("format", "png");
        formData.append("fileName", fileName);
        formData.append("foregroundColor", foregroundColor);
        formData.append("backgroundColor", backgroundColor);
        if (logoFile) formData.append("logo", logoFile);


        setParams({
            content,
            fileName,
            foregroundColor,
            backgroundColor,
            logoFile,
        });

        onGenerate(formData, {
            content,
            fileName,
            foregroundColor,
            backgroundColor,
            logoFile,
        });
    };

    return (
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-0 overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                        <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                    </div>
                    <div>
                        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Создание QR-кода
                        </h2>
                        <p className="text-sm text-gray-600">Заполните форму для генерации персонализированного QR-кода</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="p-7">
                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Content Input */}
                    <div className="space-y-3">
                        <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                            </svg>
                            Содержимое QR-кода
                        </label>
                        <input
                            type="text"
                            placeholder="Введите ссылку или текст..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className="w-full h-16 px-4 text-base border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            required
                        />
                    </div>

                    {/* Color Section */}
                    <div className="space-y-3">
                        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg
                                className="h-5 w-5 text-gray-800"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                viewBox="0 0 24 24"
                            >
                                <path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" />
                                <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" />
                                <circle cx="17.5" cy="10.5" r=".5" fill="currentColor" />
                                <circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
                                <circle cx="8.5" cy="7.5" r=".5" fill="currentColor" />
                            </svg>
                            Настройка цветов
                        </h3>

                        <div className="grid md:grid-cols-2 gap-6">
                            {/* Foreground Color */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Цвет QR-кода</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="color"
                                            value={foregroundColor}
                                            onChange={(e) => setForegroundColor(e.target.value)}
                                            className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={foregroundColor}
                                            onChange={(e) => setForegroundColor(e.target.value)}
                                            className="w-full h-16 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                            placeholder="#000000"
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">Цвет самого QR-кода (обычно темный)</div>
                            </div>

                            {/* Background Color */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Цвет фона</label>
                                <div className="flex items-center gap-4">
                                    <div className="flex-shrink-0">
                                        <input
                                            type="color"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="w-16 h-16 rounded-lg border-2 border-gray-200 cursor-pointer shadow-sm"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <input
                                            type="text"
                                            value={backgroundColor}
                                            onChange={(e) => setBackgroundColor(e.target.value)}
                                            className="w-full h-16 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                                            placeholder="#ffffff"
                                        />
                                    </div>
                                </div>
                                <div className="text-xs text-gray-500">Цвет фона QR-кода (обычно светлый)</div>
                            </div>
                        </div>
                    </div>

                    {/* Logo Upload */}
                    <div className="space-y-3">
                        <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                />
                            </svg>
                            Логотип (опционально)
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files[0])}
                                className="w-full px-3 py-4 border border-gray-200 rounded-lg file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            {logoFile && (
                                <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-green-700 font-medium flex items-center gap-2">
                                                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                </svg>
                                                Файл загружен: {logoFile.name}
                                            </p>
                                            <p className="text-xs text-green-600 mt-1">Размер: {(logoFile.size / 1024).toFixed(1)} KB</p>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLogoFile(null);
                                                if (fileInputRef.current) {
                                                    fileInputRef.current.value = null; // Сброс значения input type="file"
                                                }
                                            }}
                                            className="ml-4 text-red-600 text-sm font-medium hover:underline"
                                        >
                                            Удалить
                                        </button>
                                    </div>
                                </div>
                            )}

                        </div>
                        <div className="text-xs text-gray-500">Рекомендуемый размер: 200x200px, форматы: PNG, JPG, SVG</div>
                    </div>

                    {/* Filename Input */}
                    <div className="space-y-3">
                        <label className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                            Имя файла (опционально)</label>
                        <input
                            type="text"
                            placeholder="my-qr-code"
                            value={fileName}
                            onChange={(e) => setFileName(e.target.value)}
                            className="w-full h-16 px-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                        Сгенерировать QR-код
                    </button>
                </form>
            </div>
        </div>
    );
}
