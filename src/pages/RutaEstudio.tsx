
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Star, Clock, FileText, ArrowRight } from 'lucide-react';

const RutaEstudio = () => {
  // Datos de ejemplo para la demostración
  const cursoActual = {
    id: 1,
    nombre: 'Matemáticas Avanzadas',
    progreso: 65,
    ultimoAcceso: '2023-06-15',
    modulos: [
      { id: 1, nombre: 'Álgebra Lineal', completado: true },
      { id: 2, nombre: 'Cálculo Diferencial', completado: true },
      { id: 3, nombre: 'Cálculo Integral', completado: false },
      { id: 4, nombre: 'Ecuaciones Diferenciales', completado: false },
    ]
  };

  const cursosRecomendados = [
    { id: 2, nombre: 'Estadística y Probabilidad', nivel: 'Intermedio', duracion: '10 semanas' },
    { id: 3, nombre: 'Física Cuántica', nivel: 'Avanzado', duracion: '12 semanas' },
  ];

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mi Ruta de Estudio</h1>
          <p className="text-muted-foreground">Visualiza tu progreso académico y próximos pasos</p>
        </div>
        <Button>Explorar más cursos</Button>
      </div>

      <Tabs defaultValue="cursos" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="cursos">Mis Cursos</TabsTrigger>
          <TabsTrigger value="recomendados">Recomendados</TabsTrigger>
          <TabsTrigger value="completados">Completados</TabsTrigger>
        </TabsList>

        <TabsContent value="cursos">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{cursoActual.nombre}</CardTitle>
                      <CardDescription>Curso en progreso</CardDescription>
                    </div>
                    <Badge className="bg-primary">Activo</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-medium">Progreso del curso</span>
                        <span className="text-sm font-medium">{cursoActual.progreso}%</span>
                      </div>
                      <Progress value={cursoActual.progreso} className="h-2" />
                    </div>

                    <div className="border-t pt-4">
                      <h3 className="font-medium mb-3">Módulos del curso</h3>
                      <div className="space-y-3">
                        {cursoActual.modulos.map((modulo) => (
                          <div key={modulo.id} className="flex items-center justify-between p-3 bg-secondary/50 rounded-md">
                            <div className="flex items-center gap-3">
                              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${modulo.completado ? 'bg-green-500' : 'bg-muted-foreground/30'}`}>
                                {modulo.completado ? '✓' : (modulo.id === 3 ? '•' : '')}
                              </div>
                              <span>{modulo.nombre}</span>
                            </div>
                            <Button variant="ghost" size="sm">
                              {modulo.completado ? 'Repasar' : 'Continuar'}
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex justify-between">
                      <Button variant="outline" size="sm">Ver todos los módulos</Button>
                      <Button size="sm">Continuar aprendiendo</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card mb-6">
                <CardHeader>
                  <CardTitle className="text-lg">Resumen de progreso</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <BookOpen size={20} className="text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm">Cursos activos</p>
                        <p className="font-bold text-lg">1</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                        <Star size={20} className="text-green-500" />
                      </div>
                      <div>
                        <p className="text-sm">Módulos completados</p>
                        <p className="font-bold text-lg">2 de 4</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
                        <Clock size={20} className="text-purple-500" />
                      </div>
                      <div>
                        <p className="text-sm">Tiempo de estudio</p>
                        <p className="font-bold text-lg">12 horas</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardHeader>
                  <CardTitle className="text-lg">Recursos recientes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {['Guía de ejercicios', 'Presentación de clases', 'Material complementario'].map((recurso, index) => (
                      <div key={index} className="flex items-center gap-3 p-2 hover:bg-secondary/50 rounded-md transition-colors">
                        <FileText size={18} />
                        <span className="text-sm">{recurso}</span>
                      </div>
                    ))}
                    <Button variant="ghost" size="sm" className="w-full mt-2">
                      Ver todos los recursos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recomendados">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosRecomendados.map((curso) => (
              <Card key={curso.id} className="glass-card hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle>{curso.nombre}</CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mr-2">{curso.nivel}</Badge>
                    <span className="text-xs text-muted-foreground">{curso.duracion}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    Este curso complementa tus estudios actuales y te ayudará a ampliar tus conocimientos.
                  </p>
                  <Button className="w-full">
                    <span>Comenzar curso</span>
                    <ArrowRight size={16} className="ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completados">
          <div className="flex flex-col items-center justify-center p-10 text-center">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
              <BookOpen size={24} className="text-muted-foreground" />
            </div>
            <h3 className="text-xl font-medium mb-2">Aún no has completado ningún curso</h3>
            <p className="text-muted-foreground mb-6 max-w-md">
              Sigue avanzando en tus cursos actuales para verlos reflejados aquí.
            </p>
            <Button variant="outline" asChild>
              <a href="#cursos">Volver a mis cursos</a>
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default RutaEstudio;
