export default function InfoBlock() {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl border-0 overflow-hidden">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg">
            <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              Полезная информация
            </h3>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Tips Section */}
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-800 flex items-center gap-2 ">
            <svg className="h-4 w-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Советы по использованию QR-кодов
          </h4>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-2 bg-emerald-50 rounded-lg">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Контрастные цвета</p>
                <p className="text-xs text-gray-600">Используйте темный цвет для кода и светлый для фона</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Избегайте искажений</p>
                <p className="text-xs text-gray-600">Не растягивайте QR-код — это может сделать его нечитаемым</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-2 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <p className="text-sm font-medium text-gray-800">Тестирование</p>
                <p className="text-xs text-gray-600">Всегда проверяйте QR-код перед печатью или публикацией</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
