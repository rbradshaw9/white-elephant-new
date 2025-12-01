'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminRsvpTable from '@/components/AdminRsvpTable';
import { RSVP } from '@/lib/supabase';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        throw new Error('Invalid password');
      }

      setIsAuthenticated(true);
      fetchRsvps();
    } catch (err) {
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRsvps = async () => {
    try {
      const response = await fetch('/api/admin/rsvps');
      if (!response.ok) {
        throw new Error('Failed to fetch RSVPs');
      }
      const data = await response.json();
      setRsvps(data.rsvps);
    } catch (err) {
      console.error('Error fetching RSVPs:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-4 border-gray-700">
            <CardHeader className="bg-gradient-to-r from-gray-700 to-gray-800 text-white">
              <CardTitle className="text-3xl text-center">🔒 Admin Access</CardTitle>
              <CardDescription className="text-center text-white/80">
                Enter password to view RSVPs
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    className="text-lg py-6"
                    autoFocus
                  />
                </div>

                {error && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded"
                  >
                    {error}
                  </motion.div>
                )}

                <Button
                  type="submit"
                  disabled={isLoading || !password}
                  className="w-full bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-800 hover:to-gray-900 text-white font-bold py-6 text-lg"
                >
                  {isLoading ? 'Checking...' : '🔓 Login'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="flex justify-between items-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800">
              🎄 Admin Dashboard
            </h1>
            <Button
              onClick={() => {
                setIsAuthenticated(false);
                setPassword('');
              }}
              variant="outline"
              className="border-2 border-gray-700"
            >
              🔒 Logout
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Manage White Elephant Party RSVPs</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <AdminRsvpTable rsvps={rsvps} />
        </motion.div>
      </div>
    </div>
  );
}
