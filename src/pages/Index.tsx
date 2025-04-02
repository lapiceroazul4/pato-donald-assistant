
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { BookOpen, MessageSquare, Settings } from 'lucide-react';

const Index = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Ruta de Estudio',
      description: 'Visualiza tu progreso académico y recibe recomendaciones personalizadas.',
      link: '/ruta-estudio',
      color: 'bg-blue-500'
    },
    {
      icon: MessageSquare,
      title: 'Asistente Virtual',
      description: 'Chatea con Pato Donald para resolver dudas sobre tus materias.',
      link: '/asistente',
      color: 'bg-duck'
    },
    {
      icon: Settings,
      title: 'Administración',
      description: 'Gestiona materias y sube recursos educativos para el asistente.',
      link: '/admin',
      color: 'bg-violet-500'
    }
  ];

  return (
    <MainLayout>
      <section className="mb-10">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="w-20 h-20 bg-duck rounded-full flex items-center justify-center mb-2 animate-bounce-light">
            <img src="pato.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">Bienvenido a Pato Donald</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Tu asistente educativo personal para ayudarte en tu camino de aprendizaje
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="glass-card overflow-hidden border-t-4" style={{ borderTopColor: feature.color }}>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: feature.color }}>
                  <feature.icon className="text-white" size={24} />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{feature.description}</p>
                <Button asChild className="w-full">
                  <Link to={feature.link}>Acceder</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <Card className="glass-card">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-4">Comienza a aprender ahora</h2>
                <p className="text-muted-foreground mb-6">
                  Pato Donald está diseñado para ayudarte en tu proceso de aprendizaje,
                  proporcionando asistencia personalizada y recursos educativos adaptados
                  a tus necesidades.
                </p>
                <div className="flex gap-4">
                  <Button asChild>
                    <Link to="/asistente">Hablar con Pato Donald</Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/ruta-estudio">Ver mi ruta de estudio</Link>
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-gradient-to-br from-primary to-accent/50 rounded-lg flex items-center justify-center">
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <img src="public/pato.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </MainLayout>
  );
};

export default Index;
