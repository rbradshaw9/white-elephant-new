export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-green-800 via-red-700 to-green-800 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium">
            🎄 White Elephant Party {currentYear} 🎁
          </p>
          <p className="text-sm opacity-90">
            Made with ❤️, hot cocoa ☕, and a sprinkle of holiday magic ✨
          </p>
          <div className="flex justify-center space-x-4 mt-4 text-3xl">
            <span>🎅</span>
            <span>⛄</span>
            <span>🦌</span>
            <span>🎄</span>
            <span>🎁</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
