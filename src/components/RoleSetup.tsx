
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield } from "lucide-react";
import { toast } from "sonner";

const RoleSetup: React.FC = () => {
  const [roleId, setRoleId] = useState("");
  
  useEffect(() => {
    const savedRoleId = localStorage.getItem("discord_role_id");
    if (savedRoleId) {
      setRoleId(savedRoleId);
    }
  }, []);
  
  const handleSaveRole = () => {
    if (roleId.trim()) {
      localStorage.setItem("discord_role_id", roleId.trim());
      toast.success("ID de rol guardado correctamente");
    } else {
      localStorage.removeItem("discord_role_id");
      toast.error("Se ha eliminado el ID de rol");
    }
  };
  
  return (
    <div className="border rounded-lg p-6 space-y-4 mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <Shield className="w-5 h-5 text-bot-accent" />
        <h3 className="text-xl font-medium">Configuración de Roles</h3>
      </div>
      
      <p className="text-sm text-bot-text/70 mb-4">
        Configura el ID del rol de Discord que tendrá acceso al panel de control.
        Los usuarios necesitarán tener este rol específico para poder acceder.
      </p>
      
      <div className="space-y-2">
        <Label htmlFor="roleId">ID del Rol de Discord</Label>
        <Input
          id="roleId"
          value={roleId}
          onChange={(e) => setRoleId(e.target.value)}
          placeholder="Ej: 123456789012345678"
        />
        <p className="text-xs text-bot-text/60">
          Puedes obtener el ID del rol haciendo clic derecho en él y seleccionando "Copiar ID".
          Se requiere tener el modo desarrollador activado en Discord.
        </p>
      </div>
      
      <Button 
        onClick={handleSaveRole}
        className="w-full mt-4 bg-bot-blue hover:bg-bot-accent"
      >
        Guardar ID de Rol
      </Button>
    </div>
  );
};

export default RoleSetup;
