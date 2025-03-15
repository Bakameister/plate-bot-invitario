
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AlertCircle, Lock, User, Shield, Eye, EyeOff } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useAuth from "@/hooks/useAuth";

const formSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida")
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roleId, setRoleId] = useState("");
  const [showRoleConfig, setShowRoleConfig] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuth();
  
  useEffect(() => {
    // Check if role ID is already set
    const savedRoleId = localStorage.getItem("discord_role_id");
    if (savedRoleId) {
      setRoleId(savedRoleId);
      setShowRoleConfig(false);
    } else {
      setShowRoleConfig(true);
    }
  }, []);

  const handleSaveRole = () => {
    if (roleId.trim()) {
      localStorage.setItem("discord_role_id", roleId.trim());
      toast.success("ID de rol guardado correctamente");
      setError(null);
      setShowRoleConfig(false);
    } else {
      toast.error("Por favor ingresa un ID de rol válido");
    }
  };

  const toggleRoleConfig = () => {
    setShowRoleConfig(!showRoleConfig);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setError(null);
    
    try {
      // Get the entered role ID to check
      const expectedRoleId = localStorage.getItem("discord_role_id");
      
      if (!expectedRoleId) {
        throw new Error("No se ha configurado un ID de rol para la verificación");
      }

      // Usar el hook de autenticación para iniciar sesión
      await login(values.username, values.password);
      
      // Si el login es exitoso, mostramos mensaje y redirigimos
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error al iniciar sesión");
      toast.error("Error de autenticación");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-bot-light via-white to-bot-light p-6 flex items-center justify-center">
      <div className="glass w-full max-w-md p-8 rounded-xl">
        <div className="flex flex-col items-center mb-6 space-y-2">
          <Lock className="h-12 w-12 text-bot-accent mb-2" />
          <h1 className="text-2xl font-bold text-bot-dark">Iniciar Sesión</h1>
          <p className="text-bot-text/70 text-center">
            Accede con tus credenciales de Discord
          </p>
        </div>

        {/* Role ID Setup Section - Only shown when needed or requested */}
        {showRoleConfig ? (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Shield className="w-4 h-4 text-bot-accent" />
              <h3 className="text-md font-medium">Configuración de Rol</h3>
            </div>
            
            <div className="space-y-2 mb-3">
              <Label htmlFor="roleId">ID del Rol de Discord</Label>
              <div className="flex space-x-2">
                <Input
                  id="roleId"
                  value={roleId}
                  onChange={(e) => setRoleId(e.target.value)}
                  placeholder="Ej: 123456789012345678"
                  className="flex-1"
                />
                <Button 
                  onClick={handleSaveRole}
                  size="sm"
                  className="bg-bot-blue hover:bg-bot-accent"
                >
                  Guardar
                </Button>
              </div>
              <p className="text-xs text-bot-text/60">
                Debes configurar el ID del rol antes de iniciar sesión
              </p>
            </div>
          </div>
        ) : (
          <div className="mb-6 flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleRoleConfig}
              className="text-xs text-bot-text/70 flex items-center gap-1"
            >
              <Shield className="w-3 h-3" />
              Configurar ID de rol
            </Button>
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Usuario de Discord</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-bot-text/50" />
                      <Input 
                        placeholder="Tu nombre de usuario" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-bot-text/50" />
                      <Input 
                        type={showPassword ? "text" : "password"}
                        placeholder="Tu contraseña" 
                        className="pl-10 pr-10" 
                        {...field} 
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-3 text-bot-text/50"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-bot-blue hover:bg-bot-accent"
              disabled={isLoading || !roleId}
            >
              {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default Login;
