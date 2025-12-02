'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEventSettings } from '@/hooks/useEventSettings';

export default function RulesPage() {
  const { settings: eventConfig, loading } = useEventSettings();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 py-8 sm:py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-block">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, type: "spring" }}
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-red-600 via-green-600 to-red-600 bg-clip-text text-transparent mb-3 sm:mb-4 px-2">
                🎄 How to Play 🎁
              </h1>
            </motion.div>
            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base sm:text-xl md:text-2xl text-gray-700 font-semibold px-4"
            >
              A fast-paced, slightly chaotic holiday game where stealing is encouraged!
            </motion.p>
          </div>
        </motion.div>

        {/* Classic Rules */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 sm:mb-10"
        >
          <Card className="border-2 sm:border-4 border-red-600 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white relative overflow-hidden py-6 sm:py-8 md:py-10 px-6 sm:px-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-2 sm:gap-3 relative z-10">
                🎁 The Basic Rules
              </CardTitle>
              <p className="text-white/90 mt-3 sm:mt-4 text-sm sm:text-base md:text-lg relative z-10 font-medium">Everything you need to know to play like a pro</p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-white to-red-50">
              <ol className="space-y-4 sm:space-y-6">
                {eventConfig.rules.classic.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08, type: "spring", stiffness: 100 }}
                    className="flex gap-2 sm:gap-4 group"
                  >
                    <span className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-red-700 text-white rounded-full flex items-center justify-center font-black text-base sm:text-lg shadow-lg group-hover:scale-110 transition-transform">
                      {index + 1}
                    </span>
                    <span className="text-sm sm:text-base md:text-lg text-gray-800 pt-1 sm:pt-1.5 leading-relaxed font-medium">{rule}</span>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* Final Round */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 sm:mb-10"
        >
          <Card className="border-2 sm:border-4 border-green-600 shadow-2xl overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-300 rounded-full blur-3xl opacity-20 -mr-32 -mt-32"></div>
            <CardHeader className="bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white relative overflow-hidden py-6 sm:py-8 md:py-10 px-6 sm:px-8">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9InN0YXJzIiB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiPjx0ZXh0IHg9IjMwIiB5PSIzMCIgZm9udC1zaXplPSIyMCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIG9wYWNpdHk9IjAuMSI+4q2Q77iPPC90ZXh0PjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNzdGFycykiLz48L3N2Zz4=')] opacity-40"></div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-2 sm:gap-3 relative z-10">
                ⭐ FINAL ROUND TWIST
              </CardTitle>
              <p className="text-yellow-100 font-bold text-sm sm:text-base md:text-lg mt-3 sm:mt-4 relative z-10">
                This is where the chaos begins. Our signature rule!
              </p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-green-50 via-emerald-50 to-green-50">
              <ul className="space-y-4 sm:space-y-5">
                {eventConfig.rules.finalRound.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
                    className="bg-white p-3 sm:p-4 md:p-5 rounded-xl shadow-lg border-2 border-green-300 hover:border-green-500 hover:shadow-xl transition-all group"
                  >
                    <div className="flex items-start gap-2 sm:gap-3">
                      <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-sm sm:text-base group-hover:scale-110 transition-transform">✓</span>
                      <span className="text-sm sm:text-base md:text-lg text-gray-800 font-semibold leading-relaxed">{rule}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Pro Tips */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Card className="border-2 sm:border-4 border-yellow-500 shadow-2xl overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500 text-white relative overflow-hidden py-6 sm:py-8 md:py-10 px-6 sm:px-8">
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
              </div>
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-black flex items-center gap-2 sm:gap-3 relative z-10">
                💡 Pro Tips for Maximum Fun
              </CardTitle>
              <p className="text-white/95 font-semibold text-sm sm:text-base md:text-lg mt-3 sm:mt-4 relative z-10">
                How to win hearts, make enemies, and secure the ultimate prize!
              </p>
            </CardHeader>
            <CardContent className="p-6 sm:p-8 md:p-10 bg-gradient-to-br from-yellow-50 via-orange-50 to-yellow-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                {eventConfig.rules.tips.map((rule, index) => {
                  const isHighlighted = rule.includes('Friendships are temporary');
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
                      whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, type: "spring", stiffness: 80 }}
                      whileHover={{ scale: 1.03, rotate: 1 }}
                      className={`p-3 sm:p-4 md:p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all border-2 cursor-default ${
                        isHighlighted 
                          ? 'bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 border-red-500 hover:border-red-600 ring-2 ring-red-300 col-span-1 md:col-span-2' 
                          : 'bg-white border-yellow-300 hover:border-yellow-500'
                      }`}
                    >
                      <span className={`text-sm sm:text-base leading-relaxed block ${
                        isHighlighted ? 'text-red-800 font-black text-base sm:text-lg md:text-xl text-center' : 'text-gray-800 font-medium'
                      }`}>{rule}</span>
                    </motion.div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="bg-gradient-to-r from-red-100 via-green-100 to-red-100 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl border-2 sm:border-4 border-red-600"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-gray-800 mb-3 sm:mb-4 px-2">
              🎟️ Ready to Join the Fun?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 font-medium px-4">
              Secure your spot at the most chaotic holiday party of the year!
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 justify-center px-4">
              <motion.a
                href="/rsvp"
                whileHover={{ scale: 1.08, rotate: -1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-gradient-to-r from-red-600 via-red-700 to-green-600 text-white px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 min-h-[48px] rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-2xl hover:shadow-3xl transition-all"
              >
                🎄 RSVP Now!
              </motion.a>
              <motion.a
                href="/"
                whileHover={{ scale: 1.08, rotate: 1 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block bg-white border-2 sm:border-4 border-green-600 text-green-700 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 min-h-[48px] rounded-xl sm:rounded-2xl font-black text-base sm:text-lg md:text-xl shadow-xl hover:shadow-2xl transition-all"
              >
                🏠 Back to Home
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
