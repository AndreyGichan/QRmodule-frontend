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
                {/* How to Create Section */}
                <section className="py-20 relative overflow-hidden  bg-white/5 ">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full px-6 py-3 mb-6">

                                <span className="text-white font-medium">Начало работы</span>
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Создайте ваш{" "}
                                <span className="bg-gradient-to-r from-teal-400 via-green-500 to-lime-400 bg-clip-text text-transparent">
                                    персональный QR-код
                                </span>
                            </h2>
                            <p className="text-xl text-white/80 max-w-3xl mx-auto">За 4 простых шага к профессиональному результату</p>
                        </div>

                        <div className="max-w-7xl mx-auto">
                            <div className="grid lg:grid-cols-4 gap-8">
                                {[
                                    {
                                        number: "1",
                                        title: "Введите содержимое",
                                        description: 'В поле "Содержимое QR-кода" введите информацию, которую хотите закодировать: ссылку на сайт или текст. Это основная информация, которая будет отображаться при сканировании вашего QR-кода. Убедитесь, что данные введены корректно, так как от этого зависит работоспособность кода.',
                                        gradient: "from-emerald-500 to-cyan-500",
                                        bgGradient: "from-emerald-500/20 to-cyan-500/20",
                                    },
                                    {
                                        number: "2",
                                        title: "Настройте цвета",
                                        description: 'Выберите цветовую схему для вашего QR-кода. Настройте цвет самого кода и цвет фона. Используйте цветовые пикеры или введите HEX- коды вручную.Помните: контрастные цвета обеспечивают лучшую читаемость кода сканерами. Рекомендуется использовать темные цвета для кода на светлом фоне.',
                                        gradient: "from-purple-500 to-pink-500",
                                        bgGradient: "from-purple-500/20 to-pink-500/20",
                                    },
                                    {
                                        number: "3",
                                        title: "Добавьте логотип",
                                        description: 'При желании загрузите свой логотип или изображение, которое будет размещено в центре QR-кода. Поддерживаются форматы PNG, JPG и SVG. Рекомендуемый размер: 200x200 пикселей. Логотип автоматически масштабируется и интегрируется в QR-код с сохранением его читаемости. Также можете указать имя файла для удобства организации.',
                                        gradient: "from-orange-500 to-red-500",
                                        bgGradient: "from-orange-500/20 to-red-500/20",
                                    },
                                    {
                                        number: "4",
                                        title: "Сгенерируйте и скачайте",
                                        description: 'Нажмите кнопку "Сгенерировать QR-код" для создания вашего кода. После генерации выберите нужный формат файла: PNG для растровых изображений, PDF для документов или SVG для векторной графики. SVG идеально подходит для масштабирования и профессиональной печати. Скачайте готовый файл и используйте где угодно.',
                                        gradient: "from-blue-500 to-indigo-500",
                                        bgGradient: "from-blue-500/20 to-indigo-500/20",
                                    },
                                ].map((step, index) => (
                                    <div key={index} className="group relative">
                                        <div
                                            className={`absolute -inset-1 bg-gradient-to-r ${step.bgGradient} rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200`}
                                        ></div>
                                        <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl p-8 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2">
                                            <div className="flex items-start gap-4 mb-4">
                                                <div
                                                    className={`flex-shrink-0 min-w-[4rem] w-16 h-16 bg-gradient-to-r ${step.gradient} rounded-2xl flex items-center justify-center text-white font-bold text-2xl shadow-lg group-hover:scale-110 transition-transform duration-300`}
                                                >
                                                    {step.number}
                                                </div>
                                                <h3 className="text-lg md:text-xl font-bold text-white break-words leading-tight">
                                                    {step.title}
                                                </h3>
                                            </div>
                                            <p className="text-white/80 text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section className="py-20 relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500/20 to-violet-500/20 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="text-center mb-16">

                            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                                Профессиональные возможности <br />для создания QR-кодов
                            </h2>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Мгновенная генерация</h3>
                                    <p className="text-white/80 leading-relaxed">
                                        Создавайте QR-коды за секунды без задержек. Наш алгоритм работает молниеносно!
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                        <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-full text-sm font-medium">
                                            &lt; 1 секунды
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-8 w-8 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <line x1="21" x2="14" y1="4" y2="4" />
                                            <line x1="10" x2="3" y1="4" y2="4" />
                                            <line x1="21" x2="12" y1="12" y2="12" />
                                            <line x1="8" x2="3" y1="12" y2="12" />
                                            <line x1="21" x2="16" y1="20" y2="20" />
                                            <line x1="12" x2="3" y1="20" y2="20" />
                                            <line x1="14" x2="14" y1="2" y2="6" />
                                            <line x1="8" x2="8" y1="10" y2="14" />
                                            <line x1="16" x2="16" y1="18" y2="22" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Полная настройка</h3>
                                    <p className="text-white/80 leading-relaxed">
                                        Цвета, логотипы, форматы - всё под ваш контроль. Безграничные возможности персонализации!
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                        <div className="bg-purple-500/20 text-purple-300 px-4 py-2 rounded-full text-sm font-medium">
                                            ∞ вариантов
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="group relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 to-red-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2">
                                    <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-red-400 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-10 w-10 text-white"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M3 7V5a2 2 0 0 1 2-2h2" />
                                            <path d="M17 3h2a2 2 0 0 1 2 2v2" />
                                            <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
                                            <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
                                            <rect width="10" height="8" x="7" y="8" rx="1" />
                                        </svg>

                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-4">Высокое качество</h3>
                                    <p className="text-white/80 leading-relaxed">
                                        Векторные форматы для идеального качества печати. Профессиональный результат гарантирован!
                                    </p>
                                    <div className="mt-6 flex justify-center">
                                        <div className="bg-orange-500/20 text-orange-300 px-4 py-2 rounded-full text-sm font-medium">
                                            Четкое качество
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer - более стильный */}
                <footer className="py-16 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-purple-900/50 to-slate-900"></div>
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-1/3 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                    </div>

                    <div className="container mx-auto px-4 relative z-10">
                        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
                            <div className="md:col-span-2">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                        <span className="text-white text-xl font-bold">QR</span>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white">Generator </h3>
                                </div>
                                <p className="text-white/80 mb-6 leading-relaxed">
                                    Профессиональный инструмент для создания качественных QR-кодов с расширенными возможностями настройки.
                                    Быстро, удобно, бесплатно!
                                </p>
                                <div className="flex gap-4">
                                    {[
                                        { icon: "📧", label: "Email" },
                                        { icon: "📱", label: "Telegram" },
                                        { icon: "🌐", label: "Website" },
                                    ].map((social, index) => (
                                        <div key={index} className="group cursor-pointer">
                                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center hover:bg-white/20 transition-all duration-300 transform hover:scale-110">
                                                <span className="text-xl group-hover:scale-110 transition-transform">{social.icon}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-5 text-lg">🚀 Возможности</h4>
                                <ul className="space-y-2 text-white/80">
                                    {["Настройка цветов", "Добавление логотипов", "Множество форматов", "Высокое качество"].map(
                                        (item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer"
                                            >
                                                <span className="text-emerald-400">•</span>
                                                {item}
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>

                            <div>
                                <h4 className="font-bold text-white mb-5 text-lg">📋 Форматы</h4>
                                <ul className="space-y-2 text-white/80">
                                    {[
                                        "PNG - Растровые изображения",
                                        "SVG - Векторная графика",
                                        "PDF - Документы",
                                    ].map((item, index) => (
                                        <li key={index} className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer">
                                            <span className="text-blue-400">•</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>


                        </div>

                    </div>
                </footer>
            </div>
        </div>
    );
}

export default App;
