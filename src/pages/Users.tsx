
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Search, Users as UsersIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

// Mocked user data
const mockedUsers = [
  { id: '1', username: 'usuario1', online: true, rankId: 'rank1' },
  { id: '2', username: 'usuario2', online: false, rankId: 'rank2' },
  { id: '3', username: 'usuario3', online: true, rankId: 'rank3' },
  { id: '4', username: 'usuario4', online: true, rankId: 'rank4' },
  { id: '5', username: 'usuario5', online: false, rankId: 'rank5' },
  { id: '6', username: 'usuario6', online: true, rankId: 'rank6' },
  { id: '7', username: 'usuario7', online: true, rankId: 'rank7' },
  { id: '8', username: 'usuario8', online: false, rankId: 'rank2' },
  { id: '9', username: 'usuario9', online: true, rankId: 'rank3' },
  { id: '10', username: 'usuario10', online: true, rankId: 'rank1' },
];

// Ranks info
const RANKS = [
  { id: "rank1", name: "Novato", minRole: "1026983591978221588", image: "/ranks/rank1.png" },
  { id: "rank2", name: "Aprendiz", minRole: "1026983591978221588", image: "/ranks/rank2.png" },
  { id: "rank3", name: "Iniciado", minRole: "1026983591978221588", image: "/ranks/rank3.png" },
  { id: "rank4", name: "Experto", minRole: "1026983591978221588", image: "/ranks/rank4.png" },
  { id: "rank5", name: "Maestro", minRole: "1026983591978221588", image: "/ranks/rank5.png" },
  { id: "rank6", name: "Leyenda", minRole: "1026983591978221588", image: "/ranks/rank6.png" },
  { id: "rank7", name: "Divinidad", minRole: "1026983591978221588", image: "/ranks/rank7.png" },
];

const Users: React.FC = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [rankFilter, setRankFilter] = useState<string>('all');
  const [onlineOnly, setOnlineOnly] = useState(false);
  
  // Filter users based on search, rank, and online status
  const filteredUsers = mockedUsers.filter(u => {
    const matchesSearch = u.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRank = rankFilter === 'all' || u.rankId === rankFilter;
    const matchesOnline = !onlineOnly || u.online;
    
    return matchesSearch && matchesRank && matchesOnline;
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bot-light via-white to-bot-light p-6">
      <div className="max-w-7xl mx-auto">
        <Header />
        
        <div className="flex items-center justify-between mb-6">
          <Button asChild variant="outline" className="gap-2">
            <Link to="/">
              <ArrowLeft size={16} />
              <span>Volver al panel</span>
            </Link>
          </Button>
          
          <h2 className="text-2xl font-semibold text-bot-dark">Usuarios del Servidor</h2>
          
          <div className="flex items-center space-x-2">
            <Button
              variant={onlineOnly ? "default" : "outline"}
              onClick={() => setOnlineOnly(!onlineOnly)}
              className={onlineOnly ? "bg-green-500 hover:bg-green-600" : ""}
            >
              {onlineOnly ? "Solo en línea" : "Todos los usuarios"}
            </Button>
          </div>
        </div>
        
        <div className="glass rounded-xl p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Buscar usuario..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select value={rankFilter} onValueChange={setRankFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Filtrar por rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos los rangos</SelectItem>
                  {RANKS.map(rank => (
                    <SelectItem key={rank.id} value={rank.id}>
                      {rank.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => {
                const userRank = RANKS.find(r => r.id === user.rankId);
                return (
                  <div key={user.id} className="border rounded-lg p-4 flex items-center space-x-3 bg-white/80">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-md">
                        <img 
                          src={userRank?.image || "/ranks/rank1.png"} 
                          alt={`Rango de ${user.username}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className={`absolute -bottom-1 -right-1 w-4 h-4 ${user.online ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></span>
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-bot-dark">{user.username}</h3>
                        <span className="text-xs text-bot-text/70">ID: {user.id}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-gray-100">
                          {userRank?.name || 'Sin rango'}
                        </span>
                        <span className="ml-2 text-xs text-bot-text/70">
                          {user.online ? 'En línea' : 'Desconectado'}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-12 text-bot-text/70">
                <UsersIcon size={48} className="mb-3 opacity-30" />
                <p>No se encontraron usuarios con estos filtros</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
