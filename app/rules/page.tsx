'use client';

import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { eventConfig } from '@/config/event';

export default function RulesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-red-50 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-green-800 mb-4">
            📜 White Elephant Rules
          </h1>
          <p className="text-xl text-gray-700">
            Everything you need to know for maximum gift-stealing chaos!
          </p>
        </motion.div>

        {/* Classic Rules */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-4 border-red-600 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
              <CardTitle className="text-3xl flex items-center gap-2">
                🎄 Classic White Elephant Rules
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ol className="space-y-4">
                {eventConfig.rules.classic.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3"
                  >
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">
                      {index + 1}
                    </span>
                    <span className="text-lg text-gray-800 pt-1">{rule}</span>
                  </motion.li>
                ))}
              </ol>
            </CardContent>
          </Card>
        </motion.div>

        {/* House Rules */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Card className="border-4 border-green-600 shadow-xl">
            <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white">
              <CardTitle className="text-3xl flex items-center gap-2">
                🏠 House Rules for This Party
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {eventConfig.rules.house.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-3 items-start"
                  >
                    <span className="text-2xl flex-shrink-0">✓</span>
                    <span className="text-lg text-gray-800 pt-1">{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* Chaos Mode */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="border-4 border-yellow-600 shadow-xl bg-gradient-to-br from-yellow-50 to-orange-50">
            <CardHeader className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
              <CardTitle className="text-3xl flex items-center gap-2">
                🎭 CHAOS MODE (Optional)
              </CardTitle>
              <p className="text-white/90 text-sm mt-2">
                For those who dare... vote to activate these wild variations!
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <ul className="space-y-4">
                {eventConfig.rules.chaos.map((rule, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-300"
                  >
                    <span className="text-lg text-gray-800">{rule}</span>
                  </motion.li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-2xl font-bold text-gray-800 mb-6">
            Ready to join the fun? 🎉
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              href="/rsvp"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-gradient-to-r from-red-600 to-green-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              🎟️ RSVP Now
            </motion.a>
            <motion.a
              href="/"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-white border-4 border-green-600 text-green-700 px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              🏠 Back to Home
            </motion.a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
