'use client';

import { useState } from 'react';
import { RSVP } from '@/lib/supabase';
import { convertToCSV, downloadCSV } from '@/lib/csv';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminRsvpTableProps {
  rsvps: RSVP[];
}

export default function AdminRsvpTable({ rsvps }: AdminRsvpTableProps) {
  const [sortedRsvps, setSortedRsvps] = useState<RSVP[]>(rsvps);
  const [sortField, setSortField] = useState<keyof RSVP>('created_at');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

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

  const totalGuests = sortedRsvps.reduce((sum, rsvp) => sum + rsvp.guest_count, 0);

  return (
    <div className="space-y-6">
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

      {/* RSVP Table */}
      <Card>
        <CardHeader>
          <CardTitle>All RSVPs</CardTitle>
          <CardDescription>Click column headers to sort</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('created_at')}
                  >
                    Date {sortField === 'created_at' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead 
                    className="cursor-pointer hover:bg-gray-100"
                    onClick={() => handleSort('primary_name')}
                  >
                    Primary Name {sortField === 'primary_name' && (sortDirection === 'asc' ? '↑' : '↓')}
                  </TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="text-center">Guests</TableHead>
                  <TableHead>Guest Names</TableHead>
                  <TableHead>Elf Names</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRsvps.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center text-gray-500 py-8">
                      No RSVPs yet. Check back soon! 🎄
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedRsvps.map((rsvp) => (
                    <TableRow key={rsvp.id} className="hover:bg-gray-50">
                      <TableCell className="whitespace-nowrap">
                        {new Date(rsvp.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="font-medium">{rsvp.primary_name}</TableCell>
                      <TableCell>{rsvp.email}</TableCell>
                      <TableCell className="text-center">{rsvp.guest_count}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {rsvp.guest_names.map((name, i) => (
                            <div key={i} className="text-sm">{name}</div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          {rsvp.elf_names.map((name, i) => (
                            <div key={i} className="text-sm text-green-700 font-medium">
                              🧝 {name}
                            </div>
                          ))}
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
