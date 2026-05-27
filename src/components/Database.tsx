import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Plus, Filter, MoreHorizontal, Database as DbIcon, ChevronRight, FileJson } from 'lucide-react';
import type { Document } from '../hooks/useMobiData';

export function Database({ data }: { data: Document[] }) {
  const [activeCollection, setActiveCollection] = useState('profiles');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in slide-in-from-bottom-4 duration-500">
      <Card className="lg:col-span-1 bg-zinc-900/50 border-zinc-800 h-fit">
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <DbIcon className="w-4 h-4 text-purple-400" />
            Collections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-1 p-2">
          {['profiles', 'posts', 'comments', 'products', 'notifications'].map((col) => (
            <button
              key={col}
              onClick={() => setActiveCollection(col)}
              className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                activeCollection === col ? 'bg-purple-500/10 text-purple-400' : 'text-zinc-400 hover:bg-zinc-800'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="capitalize">{col}</span>
                <ChevronRight className={`w-3 h-3 ${activeCollection === col ? 'opacity-100' : 'opacity-0'}`} />
              </div>
            </button>
          ))}
          <Button variant="ghost" className="w-full justify-start text-xs text-zinc-500 hover:text-white mt-4 border-t border-zinc-800 pt-4">
            <Plus className="w-3 h-3 mr-2" /> New Collection
          </Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3 bg-zinc-900/50 border-zinc-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-4 flex-1">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <Input 
                placeholder="Search documents by ID..." 
                className="pl-10 bg-zinc-950/50 border-zinc-800 h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="h-9 border-zinc-800 bg-zinc-900 text-zinc-400">
              <Filter className="w-4 h-4 mr-2" /> Filter
            </Button>
          </div>
          <Button size="sm" className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" /> Insert Document
          </Button>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-zinc-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-zinc-950/50 text-zinc-400 border-b border-zinc-800">
                <tr>
                  <th className="px-4 py-3 text-left font-medium">ID</th>
                  <th className="px-4 py-3 text-left font-medium">Data</th>
                  <th className="px-4 py-3 text-left font-medium">Updated</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-800">
                {data.filter(d => d.collection === activeCollection).map((doc) => (
                  <tr key={doc.id} className="hover:bg-zinc-800/30 transition-colors group">
                    <td className="px-4 py-4 font-mono text-xs text-purple-400">{doc.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2 text-zinc-300">
                        <FileJson className="w-4 h-4 text-zinc-500" />
                        <span className="truncate max-w-[200px]">{JSON.stringify(doc.data)}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-zinc-500">{doc.updatedAt}</td>
                    <td className="px-4 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs text-zinc-500">
            <span>Showing 1-10 of 1,240 documents</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="h-8 px-3 border-zinc-800 bg-zinc-900 disabled:opacity-50" disabled>Previous</Button>
              <Button variant="outline" size="sm" className="h-8 px-3 border-zinc-800 bg-zinc-900">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}