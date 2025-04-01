
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="w-24 h-24 bg-duck rounded-full flex items-center justify-center mb-6 animate-bounce-light">
        <span className="text-duck-foreground text-3xl font-bold">404</span>
      </div>
      <h1 className="text-4xl font-bold mb-4">Página no encontrada</h1>
      <p className="text-xl text-muted-foreground mb-8 text-center max-w-md">
        Lo sentimos, pero la página que estás buscando no existe o ha sido movida.
      </p>
      <Button asChild size="lg">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft size={20} />
          Volver al inicio
        </Link>
      </Button>
    </div>
  );
};

export default NotFound;
