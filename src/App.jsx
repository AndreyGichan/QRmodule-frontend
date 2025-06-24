import React, { useState } from "react";
import QRForm from "./components/QRForm";
import QRResult from "./components/QRResult";
import HeroSection from "./components/HeroSection";
import InfoBlock from "./components/InfoBlock";

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

        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <HeroSection />
            <div className="min-h-screen modern-bg">
                <div className="container mx-auto px-4 py-12">
                    <div className="grid lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">
                        <div className="lg:col-span-3">
                            <QRForm onGenerate={handleGenerate} setParams={setParams} />
                        </div>
                        <div className="lg:col-span-2 space-y-6">
                            <QRResult path={qrPath} params={params} />
                            <InfoBlock />
                        </div>
                    </div>
                </div>


                <section className="py-10 relative">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Профессиональные решения для создания QR-кодов</h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Мгновенная генерация</h3>
                                <p className="text-white/70">Создавайте QR-коды за секунды без задержек</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3H5a2 2 0 00-2 2v12a4 4 0 004 4h2M9 3h2a2 2 0 012 2v12a4 4 0 01-4 4H7"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Полная настройка</h3>
                                <p className="text-white/70">Цвета, логотипы, размеры - всё под ваш контроль</p>
                            </div>

                            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/15 transition-all duration-300">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Высокое качество</h3>
                                <p className="text-white/70">Векторные форматы для идеального качества печати</p>
                            </div>
                        </div>
                    </div>
                </section>



                
            </div>
        </div>
    );
}

export default App;
