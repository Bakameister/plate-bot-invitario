
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage,
  FormDescription
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Database, Bot } from "lucide-react";

const connectionSchema = z.object({
  mongoUri: z.string().min(20, "URI de MongoDB es requerida"),
  discordToken: z.string().min(20, "Token de Discord es requerido"),
});

type ConnectionFormValues = z.infer<typeof connectionSchema>;

export default function ConnectionForm() {
  const form = useForm<ConnectionFormValues>({
    resolver: zodResolver(connectionSchema),
    defaultValues: {
      mongoUri: localStorage.getItem("mongoUri") || "",
      discordToken: localStorage.getItem("discordToken") || "",
    },
  });

  function onSubmit(data: ConnectionFormValues) {
    // Store credentials in localStorage (only for development/demo purposes)
    localStorage.setItem("mongoUri", data.mongoUri);
    localStorage.setItem("discordToken", data.discordToken);
    
    // Show success message
    toast.success("Credenciales guardadas localmente", {
      description: "Las credenciales se han guardado en tu navegador"
    });
    
    console.log("Credentials saved to localStorage");
  }

  return (
    <div className="glass rounded-xl p-6 mb-8 animate-fade-in">
      <h2 className="text-2xl font-semibold text-bot-dark mb-6">Conexión con Servicios Externos</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="mongoUri"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Database className="h-4 w-4" /> URI de MongoDB
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="mongodb+srv://usuario:contraseña@cluster.example.mongodb.net/" 
                    {...field} 
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  La URI de conexión a tu base de datos MongoDB
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="discordToken"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Bot className="h-4 w-4" /> Token de Discord
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Tu token del bot de Discord" 
                    {...field} 
                    type="password"
                  />
                </FormControl>
                <FormDescription>
                  El token de tu bot de Discord (mantenlo seguro)
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button 
            type="submit" 
            className="w-full bg-bot-blue hover:bg-bot-accent"
          >
            Guardar Credenciales
          </Button>
          
          <div className="text-sm text-bot-text/70 mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
            <p className="font-medium text-yellow-700 mb-1">⚠️ Nota de Seguridad</p>
            <p>Estas credenciales se guardarán solo en el almacenamiento local de tu navegador. 
            Para un entorno de producción, se recomienda utilizar variables de entorno o un servicio 
            de backend seguro como Supabase.</p>
          </div>
        </form>
      </Form>
    </div>
  );
}
