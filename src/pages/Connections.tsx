
import React from "react";
import Header from "@/components/Header";
import ConnectionForm from "@/components/ConnectionForm";
import RoleSetup from "@/components/RoleSetup";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

const Connections: React.FC = () => {
  const { logout, user } = useAuth();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-bot-light via-white to-bot-light p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <Header />
        
        <div className="mb-4 flex justify-between">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al Panel</span>
            </Link>
          </Button>
          
          <Button variant="outline" onClick={logout} className="gap-2 text-destructive">
            <LogOut className="h-4 w-4" />
            <span>Cerrar Sesión</span>
          </Button>
        </div>
        
        {user && (
          <div className="mb-6 p-4 bg-bot-blue/10 rounded-lg">
            <p className="text-sm font-medium">
              Conectado como: <span className="font-bold">{user.username}</span>
            </p>
          </div>
        )}
        
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Advertencia de Seguridad</AlertTitle>
          <AlertDescription>
            Nunca compartas tus tokens o credenciales. Esta implementación es solo para desarrollo y 
            almacena las credenciales localmente en tu navegador. Para producción, considera usar 
            variables de entorno en el servidor o una solución backend segura.
          </AlertDescription>
        </Alert>
        
        <RoleSetup />
        <ConnectionForm />
      </div>
    </div>
  );
};

export default Connections;
