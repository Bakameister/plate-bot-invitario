
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { AlertCircle, Lock, User } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const formSchema = z.object({
  username: z.string().min(1, "El nombre de usuario es requerido"),
  password: z.string().min(1, "La contraseña es requerida")
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      // Simulate Discord authentication (in a real app, would call Discord API)
      const mockSuccessLogin = values.username.length > 2 && values.password.length > 2;
      
      if (!mockSuccessLogin) {
        throw new Error("Credenciales de Discord inválidas");
      }
      
      // Mock user object with roles (in a real app, would get from Discord API)
      const user = {
        id: "1234567890",
        username: values.username,
        roles: [expectedRoleId] // Mock that user has the expected role
      };
      
      // Store user in localStorage
      localStorage.setItem("discord_user", JSON.stringify(user));
      
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
                        type="password" 
                        placeholder="Tu contraseña" 
                        className="pl-10" 
                        {...field} 
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button 
              type="submit" 
              className="w-full bg-bot-blue hover:bg-bot-accent"
              disabled={isLoading}
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
