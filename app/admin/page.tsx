'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AdminRsvpTable from '@/components/AdminRsvpTable';
import AdminSettings from '@/components/AdminSettings';
import EmailEditor from '@/components/EmailEditor';
import { RSVP } from '@/lib/supabase';

type TabType = 'rsvps' | 'settings' | 'email';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [error, setError] = useState('');
  const [rsvps, setRsvps] = useState<RSVP[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('rsvps');
  const [migrationMessage, setMigrationMessage] = useState('');

  // Restore session from localStorage on mount
  useEffect(() => {
    const savedPassword = localStorage.getItem('adminPassword');
    if (savedPassword) {
      console.log('[Admin] Restoring session from localStorage');
      setPassword(savedPassword);
      setIsAuthenticated(true);
    }
  }, []);

  // Refetch RSVPs when switching to RSVPs tab
  useEffect(() => {
    console.log('[Admin] useEffect triggered - isAuthenticated:', isAuthenticated, 'activeTab:', activeTab, 'password length:', password?.length);
    if (isAuthenticated && activeTab === 'rsvps') {
      console.log('[Admin] Calling fetchRsvps from useEffect');
      fetchRsvps();
    }
  }, [activeTab, isAuthenticated, password]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    console.log('[Admin] Login attempt with password length:', loginPassword.length);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });

      console.log('[Admin] Login response status:', response.status);
      if (!response.ok) {
        throw new Error('Invalid password');
      }

      console.log('[Admin] Login successful, setting password and auth state');
      setPassword(loginPassword);
      setIsAuthenticated(true);
      localStorage.setItem('adminPassword', loginPassword);
    } catch (err) {
      console.error('[Admin] Login error:', err);
      setError('Invalid password. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRsvps = async () => {
    console.log('[Admin] Fetching RSVPs with password length:', password?.length);
    try {
      const response = await fetch('/api/admin/rsvps', {
        headers: {
          'x-admin-password': password,
        },
      });
      console.log('[Admin] RSVP fetch response status:', response.status);
      if (!response.ok) {
        const errorData = await response.json();
        console.error('[Admin] RSVP fetch failed:', errorData);
        throw new Error('Failed to fetch RSVPs');
      }
      const data = await response.json();
      console.log('[Admin] RSVPs fetched:', data.rsvps?.length || 0, 'items');
      setRsvps(data.rsvps);
    } catch (err) {
      console.error('[Admin] Error fetching RSVPs:', err);
    }
  };

  const handleMigrateRsvps = async () => {
    setMigrationMessage('Migrating...');
    try {
      const response = await fetch('/api/admin/migrate-rsvps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });

      const data = await response.json();
      if (response.ok) {
        setMigrationMessage(`✅ Success! Migrated ${data.migrated?.length || 0} RSVPs. Refreshing...`);
        setTimeout(() => {
          fetchRsvps();
          setMigrationMessage('');
        }, 2000);
      } else {
        setMigrationMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      setMigrationMessage(`❌ Error: ${(error as Error).message}`);
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
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
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
                  disabled={isLoading || !loginPassword}
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
                console.log('[Admin] Logging out');
                setIsAuthenticated(false);
                setPassword('');
                setLoginPassword('');
                localStorage.removeItem('adminPassword');
              }}
              variant="outline"
              className="border-2 border-gray-700"
            >
              🔒 Logout
            </Button>
          </div>
          <p className="text-gray-600 mt-2">Manage your White Elephant Bash</p>
        </motion.div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('rsvps')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'rsvps'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              📋 RSVPs
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ⚙️ Event Settings
            </button>
            <button
              onClick={() => setActiveTab('email')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'email'
                  ? 'border-red-600 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              ✉️ Email Template
            </button>
          </nav>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {activeTab === 'rsvps' && (
            <>
              {migrationMessage && (
                <div className={`mb-4 p-4 rounded-lg ${migrationMessage.includes('✅') ? 'bg-green-50 text-green-800' : 'bg-yellow-50 text-yellow-800'}`}>
                  {migrationMessage}
                </div>
              )}
              <div className="mb-4">
                <Button
                  onClick={handleMigrateRsvps}
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  🔄 Migrate Existing RSVPs (Add Primary to Guest List)
                </Button>
              </div>
              <AdminRsvpTable rsvps={rsvps} />
            </>
          )}
          {activeTab === 'settings' && <AdminSettings password={password} />}
          {activeTab === 'email' && <EmailEditor password={password} />}
        </motion.div>
      </div>
    </div>
  );
}
