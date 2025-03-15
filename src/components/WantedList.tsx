import React, { useState } from 'react';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, Search, Plus, Trash2 } from 'lucide-react';

interface WantedPerson {
  id: string;
  name: string;
  lastName: string;
  crime: string;
  stars: number;
  priority: 'Baja' | 'Media' | 'Alta';
  imageUrl?: string;
}

const WantedList: React.FC = () => {
  const [wantedPersons, setWantedPersons] = useState<WantedPerson[]>(() => {
    const stored = localStorage.getItem('wanted_persons');
    return stored ? JSON.parse(stored) : [
      {
        id: '1',
        name: 'John',
        lastName: 'Doe',
        crime: 'Robo a mano armada',
        stars: 3,
        priority: 'Media',
        imageUrl: '/placeholder-avatar.png'
      },
      {
        id: '2',
        name: 'Jane',
        lastName: 'Smith',
        crime: 'Homicidio',
        stars: 5,
        priority: 'Alta',
        imageUrl: '/placeholder-avatar.png'
      }
    ];
  });
  
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newPerson, setNewPerson] = useState<Omit<WantedPerson, 'id'>>({
    name: '',
    lastName: '',
    crime: '',
    stars: 1,
    priority: 'Baja'
  });
  
  // Save to localStorage whenever wantedPersons changes
  React.useEffect(() => {
    localStorage.setItem('wanted_persons', JSON.stringify(wantedPersons));
  }, [wantedPersons]);
  
  const handleAddPerson = () => {
    if (newPerson.name && newPerson.lastName && newPerson.crime) {
      const newId = Date.now().toString();
      setWantedPersons(prev => [...prev, { ...newPerson, id: newId }]);
      setNewPerson({
        name: '',
        lastName: '',
        crime: '',
        stars: 1,
        priority: 'Baja'
      });
      setShowForm(false);
    }
  };
  
  const handleDeletePerson = (id: string) => {
    setWantedPersons(prev => prev.filter(person => person.id !== id));
  };
  
  const filteredPersons = wantedPersons.filter(person => 
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.crime.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const renderStars = (count: number) => {
    return Array(5).fill(0).map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < count ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}`} 
      />
    ));
  };
  
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Baja': return 'bg-green-100 text-green-800 border-green-300';
      case 'Media': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Alta': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };
  
  return (
    <div className="rounded-xl p-6 mb-8 animate-slide-up backdrop-blur-md bg-gradient-to-r from-[#3a3325]/80 to-[#4a5741]/80 border-2 border-[#5d6945]/50 shadow-md">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-[#f5f0dc]">Orden y captura</h2>
        <div className="flex space-x-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#f5f0dc]/50" size={16} />
            <Input 
              placeholder="Buscar sospechoso..." 
              className="pl-10 bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => setShowForm(!showForm)} 
            className="bg-[#5d6945] hover:bg-[#6b7552] text-[#f5f0dc] border-[#f5f0dc]/20"
          >
            <Plus size={16} className="mr-2" />
            {showForm ? 'Cancelar' : 'Añadir sospechoso'}
          </Button>
        </div>
      </div>
      
      {showForm && (
        <div className="mb-6 p-4 rounded-lg bg-[#2a2a20]/70 border border-[#5d6945]">
          <h3 className="text-lg font-medium text-[#f5f0dc] mb-4">Nuevo sospechoso</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Input 
              placeholder="Nombre" 
              value={newPerson.name}
              onChange={(e) => setNewPerson({...newPerson, name: e.target.value})}
              className="bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]"
            />
            <Input 
              placeholder="Apellido" 
              value={newPerson.lastName}
              onChange={(e) => setNewPerson({...newPerson, lastName: e.target.value})}
              className="bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]"
            />
            <Input 
              placeholder="Delito" 
              value={newPerson.crime}
              onChange={(e) => setNewPerson({...newPerson, crime: e.target.value})}
              className="bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]"
            />
            <Select 
              value={newPerson.stars.toString()} 
              onValueChange={(val) => setNewPerson({...newPerson, stars: parseInt(val)})}
            >
              <SelectTrigger className="bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]">
                <SelectValue placeholder="Cargos (Estrellas)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">⭐ (1 Estrella)</SelectItem>
                <SelectItem value="2">⭐⭐ (2 Estrellas)</SelectItem>
                <SelectItem value="3">⭐⭐⭐ (3 Estrellas)</SelectItem>
                <SelectItem value="4">⭐⭐⭐⭐ (4 Estrellas)</SelectItem>
                <SelectItem value="5">⭐⭐⭐⭐⭐ (5 Estrellas)</SelectItem>
              </SelectContent>
            </Select>
            <Select 
              value={newPerson.priority} 
              onValueChange={(val: 'Baja' | 'Media' | 'Alta') => setNewPerson({...newPerson, priority: val})}
            >
              <SelectTrigger className="bg-[#2a2a20]/70 border-[#5d6945] text-[#f5f0dc]">
                <SelectValue placeholder="Prioridad" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Baja">Baja</SelectItem>
                <SelectItem value="Media">Media</SelectItem>
                <SelectItem value="Alta">Alta</SelectItem>
              </SelectContent>
            </Select>
            <div>
              <Button 
                onClick={handleAddPerson}
                className="bg-[#5d6945] hover:bg-[#6b7552] text-[#f5f0dc] w-full"
              >
                Añadir a la lista
              </Button>
            </div>
          </div>
        </div>
      )}
      
      <div className="rounded-lg overflow-hidden border border-[#5d6945]">
        <Table>
          <TableHeader className="bg-[#2a2a20]/90">
            <TableRow className="border-b border-[#5d6945]">
              <TableHead className="text-[#f5f0dc]">Sospechoso</TableHead>
              <TableHead className="text-[#f5f0dc]">Delito</TableHead>
              <TableHead className="text-[#f5f0dc]">Cargos</TableHead>
              <TableHead className="text-[#f5f0dc]">Prioridad</TableHead>
              <TableHead className="text-[#f5f0dc] text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPersons.length > 0 ? (
              filteredPersons.map((person) => (
                <TableRow key={person.id} className="bg-[#2a2a20]/70 border-b border-[#5d6945] hover:bg-[#3a3325]/70">
                  <TableCell className="font-medium text-[#f5f0dc]">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#5d6945] flex items-center justify-center text-white">
                        {person.imageUrl ? (
                          <img src={person.imageUrl} alt={person.name} className="w-full h-full object-cover" />
                        ) : (
                          <span>{person.name[0]}{person.lastName[0]}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-[#f5f0dc]">{person.name} {person.lastName}</div>
                        <div className="text-xs text-[#f5f0dc]/50">ID: {person.id}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#f5f0dc]">{person.crime}</TableCell>
                  <TableCell>
                    <div className="flex">{renderStars(person.stars)}</div>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs border ${getPriorityColor(person.priority)}`}>
                      {person.priority}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => handleDeletePerson(person.id)}
                      className="text-red-400 hover:text-red-500 hover:bg-red-500/10"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-[#f5f0dc]/70 bg-[#2a2a20]/70">
                  No se encontraron sospechosos con los criterios de búsqueda actuales.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default WantedList;
