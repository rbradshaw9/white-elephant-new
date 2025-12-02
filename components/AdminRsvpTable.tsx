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
      
      // Handle undefined values
      if (aValue === undefined && bValue === undefined) return 0;
      if (aValue === undefined) return 1;
      if (bValue === undefined) return -1;
      
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

  const handleDeleteAttendee = async (rsvpId: string, attendeeIndex: number) => {
    const rsvp = sortedRsvps.find(r => r.id === rsvpId);
    if (!rsvp) return;

    const attendeeName = rsvp.guest_names[attendeeIndex];
    if (!confirm(`Are you sure you want to remove ${attendeeName} from this RSVP? This cannot be undone.`)) {
      return;
    }

    setDeletingId(`${rsvpId}-${attendeeIndex}`);
    try {
      // If this is the last attendee, delete the entire RSVP
      if (rsvp.guest_names.length === 1) {
        const response = await fetch('/api/admin/delete-rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password, rsvpId })
        });

        if (!response.ok) {
          throw new Error('Failed to delete');
        }
      } else {
        // Remove just this attendee
        const newGuestNames = rsvp.guest_names.filter((_, i) => i !== attendeeIndex);
        const newElfNames = rsvp.elf_names.filter((_, i) => i !== attendeeIndex);

        const response = await fetch('/api/admin/update-rsvp', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            password,
            rsvp: {
              id: rsvp.id,
              primary_name: rsvp.primary_name,
              email: rsvp.email,
              guest_count: newGuestNames.length,
              guest_names: newGuestNames,
              elf_names: newElfNames,
            }
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update');
        }
      }

      onRefresh();
    } catch (error) {
      alert('Failed to delete attendee: ' + (error as Error).message);
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
      isPrimary: index === 0,
      strategy: rsvp.strategy,
      lifeAsGift: rsvp.life_as_gift
    }))
  );

  // Get RSVPs with funny responses
  const funnyResponses = sortedRsvps.filter(rsvp => rsvp.strategy || rsvp.life_as_gift);

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

      {/* Funny Responses */}
      {funnyResponses.length > 0 && (
        <Card className="border-yellow-500 bg-yellow-50/30">
          <CardHeader>
            <CardTitle className="text-yellow-800">🎭 Funny Responses</CardTitle>
            <CardDescription>Laugh-worthy answers from your guests</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {funnyResponses.map(rsvp => (
                <div key={rsvp.id} className="bg-white p-4 rounded-lg border-2 border-yellow-200">
                  <div className="font-bold text-gray-800 mb-2">{rsvp.primary_name}</div>
                  {rsvp.strategy && (
                    <div className="mb-2">
                      <span className="text-xs font-semibold text-gray-600">Strategy:</span>
                      <p className="text-sm text-gray-700 mt-1">
                        {rsvp.strategy === 'steal-everything' && '🦹 Steal everything (chaos agent)'}
                        {rsvp.strategy === 'play-safe' && '😇 Play it safe (boring)'}
                        {rsvp.strategy === 'pure-chaos' && '🔥 Pure chaos (agent of destruction)'}
                        {rsvp.strategy === 'no-idea' && '🤷 I have no idea what I\'m doing'}
                        {rsvp.strategy === 'here-for-snacks' && '🍕 Just here for snacks'}
                        {rsvp.strategy === 'friendship-destroyer' && '💔 Friendship destroyer'}
                      </p>
                    </div>
                  )}
                  {rsvp.life_as_gift && (
                    <div>
                      <span className="text-xs font-semibold text-gray-600">Life as a gift:</span>
                      <p className="text-sm text-gray-700 mt-1 italic">&quot;{rsvp.life_as_gift}&quot;</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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
                            onClick={() => {
                              const rsvp = sortedRsvps.find(r => r.id === row.rsvpId);
                              if (rsvp) {
                                const attendeeIndex = rsvp.guest_names.indexOf(row.attendeeName);
                                handleDeleteAttendee(row.rsvpId, attendeeIndex);
                              }
                            }}
                            disabled={deletingId === `${row.rsvpId}-${sortedRsvps.find(r => r.id === row.rsvpId)?.guest_names.indexOf(row.attendeeName)}`}
                          >
                            {deletingId === `${row.rsvpId}-${sortedRsvps.find(r => r.id === row.rsvpId)?.guest_names.indexOf(row.attendeeName)}` ? '...' : '🗑️'}
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
