import React, { useState } from "react";

export default function QRForm({ onGenerate, setParams }) {
    const [content, setContent] = useState("");
    const [fileName, setFileName] = useState("");
    const [foregroundColor, setForegroundColor] = useState("#000000");
    const [backgroundColor, setBackgroundColor] = useState("#ffffff");
    const [logoFile, setLogoFile] = useState(null);

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
        <form onSubmit={handleSubmit} className="space-y-4 bg-belpostLight p-6 rounded-2xl shadow">
            <h2 className="text-xl font-bold text-belpostBlue">Создание QR-кода</h2>

            <input
                type="text"
                placeholder="Введите ссылку или текст"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-2 border rounded"
                required
            />

            <div className="flex gap-4">
                <label>
                    Цвет кода:
                    <input type="color" value={foregroundColor} onChange={(e) => setForegroundColor(e.target.value)} />
                </label>

                <label>
                    Цвет фона:
                    <input type="color" value={backgroundColor} onChange={(e) => setBackgroundColor(e.target.value)} />
                </label>
            </div>

            <div>
                <label>
                    Загрузить логотип:
                    <input type="file" accept="image/*" onChange={(e) => setLogoFile(e.target.files[0])} />
                </label>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Имя файла"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button type="submit" className="bg-belpostBlue text-white px-4 py-2 rounded hover:bg-blue-700">
                Сгенерировать
            </button>
        </form>
    );
}
