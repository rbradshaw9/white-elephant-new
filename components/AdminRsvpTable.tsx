'use client';

import React, { useState, useEffect } from 'react';
import { RSVP } from '@/lib/supabase';
import { convertToCSV, downloadCSV } from '@/lib/csv';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import EditRsvpDialog from '@/components/EditRsvpDialog';

interface AdminRsvpTableProps {
  rsvps: RSVP[];
  password: string;
  onRefresh: () => void;
}

export default function AdminRsvpTable({ rsvps, password, onRefresh }: AdminRsvpTableProps) {
  const [sortedRsvps, setSortedRsvps] = useState<RSVP[]>(rsvps);
  const [sortField, setSortField] = useState<keyof RSVP>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [editingRsvp, setEditingRsvp] = useState<RSVP | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Update sortedRsvps when rsvps prop changes
  useEffect(() => {
    console.log('[AdminRsvpTable] RSVPs prop updated:', rsvps.length);
    setSortedRsvps(rsvps);
  }, [rsvps]);

  const handleSort = (field: keyof RSVP) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);

    const sorted = [...sortedRsvps].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];
      
      if (aValue < bValue) return newDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return newDirection === 'asc' ? 1 : -1;
      return 0;
    });
    
    setSortedRsvps(sorted);
  };

  const handleExportCSV = () => {
    const csv = convertToCSV(sortedRsvps);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadCSV(csv, `white-elephant-rsvps-${timestamp}.csv`);
  };

  const handleDelete = async (rsvpId: string) => {
    if (!confirm('Are you sure you want to delete this RSVP? This cannot be undone.')) {
      return;
    }

    setDeletingId(rsvpId);
    try {
      const response = await fetch('/api/admin/delete-rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, rsvpId })
      });

      if (!response.ok) {
        throw new Error('Failed to delete');
      }

      onRefresh();
    } catch (error) {
      alert('Failed to delete RSVP: ' + (error as Error).message);
    } finally {
      setDeletingId(null);
    }
  };

  const totalGuests = sortedRsvps.reduce((sum, rsvp) => sum + rsvp.guest_count, 0);
  
  // Flatten RSVPs into individual attendee rows
  const attendeeRows = sortedRsvps.flatMap(rsvp => 
    rsvp.guest_names.map((name, index) => ({
      rsvpId: rsvp.id,
      date: rsvp.created_at,
      primaryName: rsvp.primary_name,
      email: rsvp.email,
      attendeeName: name,
      elfName: rsvp.elf_names[index] || '',
      totalPartySize: rsvp.guest_count,
      isPrimary: index === 0
    }))
  );

  return (
    <div className="space-y-6">
      <EditRsvpDialog
        rsvp={editingRsvp}
        open={!!editingRsvp}
        onClose={() => setEditingRsvp(null)}
        onSave={() => {
          setEditingRsvp(null);
          onRefresh();
        }}
        password={password}
      />

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-600">
          <CardHeader className="pb-3">
            <CardDescription>Total RSVPs</CardDescription>
            <CardTitle className="text-4xl text-green-700">{sortedRsvps.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-red-600">
          <CardHeader className="pb-3">
            <CardDescription>Total Guests</CardDescription>
            <CardTitle className="text-4xl text-red-700">{totalGuests}</CardTitle>
          </CardHeader>
        </Card>
        <Card className="border-yellow-600">
          <CardHeader className="pb-3">
            <CardDescription>Avg Party Size</CardDescription>
            <CardTitle className="text-4xl text-yellow-700">
              {sortedRsvps.length > 0 ? (totalGuests / sortedRsvps.length).toFixed(1) : '0'}
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Export Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleExportCSV}
          className="bg-gradient-to-r from-green-600 to-red-600 hover:from-green-700 hover:to-red-700"
        >
          📥 Export to CSV
        </Button>
      </div>

      {/* RSVP Table - Individual Attendees with Edit/Delete */}
      <Card>
        <CardHeader>
          <CardTitle>All Attendees (Individual)</CardTitle>
          <CardDescription>Each person listed with their elf name - {totalGuests} total attendees</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>RSVP Date</TableHead>
                  <TableHead>Primary Contact</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Attendee Name</TableHead>
                  <TableHead>Elf Name</TableHead>
                  <TableHead className="text-center">Party Size</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attendeeRows.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center text-gray-500 py-8">
                      No RSVPs yet. Check back soon! 🎄
                    </TableCell>
                  </TableRow>
                ) : (
                  attendeeRows.map((row, index) => (
                    <TableRow 
                      key={`${row.rsvpId}-${index}`} 
                      className={`hover:bg-gray-50 ${row.isPrimary ? 'bg-green-50/30' : ''}`}
                    >
                      <TableCell className="whitespace-nowrap">
                        {new Date(row.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{row.primaryName}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell className="font-semibold text-gray-800">
                        {row.attendeeName}
                        {row.isPrimary && (
                          <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded">Primary</span>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="text-sm text-green-700 font-medium">
                          🧝 {row.elfName}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">{row.totalPartySize}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex gap-2 justify-end">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              const rsvp = sortedRsvps.find(r => r.id === row.rsvpId);
                              if (rsvp) setEditingRsvp(rsvp);
                            }}
                            className="text-blue-600 border-blue-600 hover:bg-blue-50"
                          >
                            ✏️
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDelete(row.rsvpId)}
                            disabled={deletingId === row.rsvpId}
                          >
                            {deletingId === row.rsvpId ? '...' : '🗑️'}
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
