
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Terminal, Copy, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Command {
  name: string;
  description: string;
  syntax: string;
}

const commands: Command[] = [
  {
    name: "Ver placas",
    description: "Muestra todas tus placas disponibles",
    syntax: "!placas"
  },
  {
    name: "Ver inventario",
    description: "Muestra todos los items en tu inventario",
    syntax: "!inventario"
  },
  {
    name: "Equipar placa",
    description: "Equipa una placa específica por su ID",
    syntax: "!equipar-placa <id>"
  },
  {
    name: "Dar placa",
    description: "Da una placa a otro usuario (solo admins)",
    syntax: "!dar-placa <@usuario> <id>"
  }
];

const CommandPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);

  const filteredCommands = commands.filter(command => 
    command.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    command.syntax.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (syntax: string) => {
    navigator.clipboard.writeText(syntax);
    setCopiedCommand(syntax);
    setTimeout(() => setCopiedCommand(null), 2000);
  };

  return (
    <Card className="glass">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-2">
          <Terminal size={18} className="text-bot-blue" />
          <CardTitle className="text-xl">Comandos</CardTitle>
        </div>
        <Input
          placeholder="Buscar comandos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mt-2"
        />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {filteredCommands.map((command, index) => (
            <div key={index} className="p-3 rounded-md bg-white border border-gray-100 shadow-subtle">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-bot-dark">{command.name}</h3>
                  <p className="text-xs text-bot-text/70 mt-0.5">{command.description}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleCopy(command.syntax)}
                  className="h-8 w-8"
                >
                  {copiedCommand === command.syntax ? (
                    <CheckCircle size={16} className="text-green-500" />
                  ) : (
                    <Copy size={16} className="text-bot-text/60" />
                  )}
                </Button>
              </div>
              <div className="mt-2 bg-bot-light rounded p-2 font-mono text-sm text-bot-accent">
                {command.syntax}
              </div>
            </div>
          ))}
          {filteredCommands.length === 0 && (
            <div className="text-center py-8 text-bot-text/60">
              No se encontraron comandos
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CommandPanel;
