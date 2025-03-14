
import React from "react";
import Header from "@/components/Header";
import ConnectionForm from "@/components/ConnectionForm";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Connections: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-bot-light via-white to-bot-light p-6 pb-20">
      <div className="max-w-3xl mx-auto">
        <Header />
        
        <div className="mb-4">
          <Button variant="outline" asChild className="gap-2">
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
              <span>Volver al Panel</span>
            </Link>
          </Button>
        </div>
        
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Advertencia de Seguridad</AlertTitle>
          <AlertDescription>
            Nunca compartas tus tokens o credenciales. Esta implementación es solo para desarrollo y 
            almacena las credenciales localmente en tu navegador. Para producción, considera usar 
            variables de entorno en el servidor o una solución backend segura.
          </AlertDescription>
        </Alert>
        
        <ConnectionForm />
      </div>
    </div>
  );
};

export default Connections;
