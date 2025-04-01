
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import { FileUp, Plus, Trash2, Book, FileText, Edit } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const Admin = () => {
  const [newSubject, setNewSubject] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const { toast } = useToast();

  // Datos de ejemplo
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Matemáticas', active: true, documents: 3 },
    { id: 2, name: 'Física', active: true, documents: 2 },
    { id: 3, name: 'Química', active: false, documents: 1 },
  ]);

  const [documents, setDocuments] = useState([
    { id: 1, name: 'Álgebra Lineal.pdf', subject: 'Matemáticas', size: '2.3 MB', date: '2023-05-12' },
    { id: 2, name: 'Cálculo Diferencial.pdf', subject: 'Matemáticas', size: '1.8 MB', date: '2023-05-10' },
    { id: 3, name: 'Cinemática.pdf', subject: 'Física', size: '3.1 MB', date: '2023-04-28' },
  ]);

  const handleAddSubject = () => {
    if (!newSubject.trim()) return;
    
    const newId = subjects.length > 0 ? Math.max(...subjects.map(s => s.id)) + 1 : 1;
    
    setSubjects([
      ...subjects,
      { id: newId, name: newSubject, active: true, documents: 0 }
    ]);
    
    setNewSubject('');
    
    toast({
      title: "Materia creada",
      description: `La materia "${newSubject}" ha sido creada exitosamente.`,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadDocument = () => {
    if (!selectedFile || !selectedSubject) return;
    
    const newId = documents.length > 0 ? Math.max(...documents.map(d => d.id)) + 1 : 1;
    
    const newDocument = {
      id: newId,
      name: selectedFile.name,
      subject: selectedSubject,
      size: `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`,
      date: new Date().toISOString().split('T')[0]
    };
    
    setDocuments([...documents, newDocument]);
    
    // Actualizar contador de documentos de la materia
    setSubjects(subjects.map(subject => 
      subject.name === selectedSubject 
        ? { ...subject, documents: subject.documents + 1 }
        : subject
    ));
    
    setSelectedFile(null);
    
    toast({
      title: "Documento subido",
      description: `El documento "${selectedFile.name}" ha sido subido correctamente.`,
    });
  };

  const toggleSubjectStatus = (id: number) => {
    setSubjects(subjects.map(subject => 
      subject.id === id 
        ? { ...subject, active: !subject.active }
        : subject
    ));
  };

  const deleteDocument = (id: number) => {
    const documentToDelete = documents.find(doc => doc.id === id);
    
    if (documentToDelete) {
      // Actualizar contador de documentos de la materia
      setSubjects(subjects.map(subject => 
        subject.name === documentToDelete.subject 
          ? { ...subject, documents: subject.documents - 1 }
          : subject
      ));
      
      // Eliminar el documento
      setDocuments(documents.filter(doc => doc.id !== id));
      
      toast({
        title: "Documento eliminado",
        description: `El documento "${documentToDelete.name}" ha sido eliminado.`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Panel de Administración</h1>
        <p className="text-muted-foreground">Gestiona materias y recursos educativos</p>
      </div>

      <Tabs defaultValue="subjects" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="subjects">Materias</TabsTrigger>
          <TabsTrigger value="documents">Documentos</TabsTrigger>
          <TabsTrigger value="settings">Configuración</TabsTrigger>
        </TabsList>

        <TabsContent value="subjects">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Materias disponibles</CardTitle>
                  <CardDescription>
                    Las materias activas estarán disponibles para consultas en el asistente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {subjects.length > 0 ? (
                      subjects.map((subject) => (
                        <div key={subject.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-md">
                          <div className="flex items-center gap-3">
                            <Book size={20} className={subject.active ? 'text-primary' : 'text-muted-foreground'} />
                            <div>
                              <h3 className="font-medium">{subject.name}</h3>
                              <p className="text-xs text-muted-foreground">{subject.documents} documentos</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Switch 
                              checked={subject.active} 
                              onCheckedChange={() => toggleSubjectStatus(subject.id)}
                            />
                            <Button variant="ghost" size="icon">
                              <Edit size={16} />
                            </Button>
                            <Button variant="ghost" size="icon" className="text-destructive">
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay materias creadas</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Crear nueva materia</CardTitle>
                  <CardDescription>
                    Agrega una nueva materia al sistema
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject-name">Nombre de la materia</Label>
                      <Input 
                        id="subject-name" 
                        placeholder="Ej: Biología" 
                        value={newSubject}
                        onChange={(e) => setNewSubject(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddSubject} disabled={!newSubject.trim()} className="w-full">
                    <Plus size={16} className="mr-2" />
                    Crear materia
                  </Button>
                </CardFooter>
              </Card>

              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle>Estadísticas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total de materias:</span>
                      <span className="font-bold">{subjects.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Materias activas:</span>
                      <span className="font-bold">{subjects.filter(s => s.active).length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total de documentos:</span>
                      <span className="font-bold">{documents.length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="documents">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Documentos cargados</CardTitle>
                  <CardDescription>
                    Archivos disponibles para el asistente
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {documents.length > 0 ? (
                      documents.map((document) => (
                        <div key={document.id} className="flex items-center justify-between p-4 bg-secondary/30 rounded-md">
                          <div className="flex items-center gap-3">
                            <FileText size={20} className="text-primary" />
                            <div>
                              <h3 className="font-medium">{document.name}</h3>
                              <div className="flex gap-2 text-xs text-muted-foreground">
                                <span>{document.subject}</span>
                                <span>•</span>
                                <span>{document.size}</span>
                                <span>•</span>
                                <span>{document.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Button variant="ghost" size="icon" className="text-destructive" onClick={() => deleteDocument(document.id)}>
                              <Trash2 size={16} />
                            </Button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">No hay documentos cargados</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="glass-card">
                <CardHeader>
                  <CardTitle>Subir documento</CardTitle>
                  <CardDescription>
                    Sube un archivo PDF para enriquecer la base de conocimiento
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="subject-select">Seleccionar materia</Label>
                      <select 
                        id="subject-select"
                        className="w-full p-2 rounded-md border bg-background"
                        onChange={(e) => setSelectedSubject(e.target.value)}
                        value={selectedSubject || ''}
                      >
                        <option value="" disabled>Selecciona una materia</option>
                        {subjects.filter(s => s.active).map((subject) => (
                          <option key={subject.id} value={subject.name}>
                            {subject.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="file-upload">Archivo PDF</Label>
                      <div className="border-2 border-dashed rounded-md p-6 text-center">
                        {selectedFile ? (
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="mt-2"
                              onClick={() => setSelectedFile(null)}
                            >
                              Cambiar archivo
                            </Button>
                          </div>
                        ) : (
                          <div>
                            <FileUp size={24} className="mx-auto mb-2 text-muted-foreground" />
                            <p className="text-sm text-muted-foreground mb-2">
                              Haz clic para seleccionar o arrastra un archivo aquí
                            </p>
                            <input
                              id="file-upload"
                              type="file"
                              accept=".pdf"
                              className="hidden"
                              onChange={handleFileChange}
                            />
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => document.getElementById('file-upload')?.click()}
                            >
                              Seleccionar archivo
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={handleUploadDocument} 
                    disabled={!selectedFile || !selectedSubject}
                    className="w-full"
                  >
                    <FileUp size={16} className="mr-2" />
                    Subir documento
                  </Button>
                </CardFooter>
              </Card>

              <Card className="glass-card mt-6">
                <CardHeader>
                  <CardTitle>Información</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm space-y-2">
                    <p>• Los archivos deben estar en formato PDF</p>
                    <p>• Tamaño máximo: 10 MB por archivo</p>
                    <p>• El contenido de los documentos será procesado para que el asistente pueda utilizarlo</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="settings">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle>Configuración del asistente</CardTitle>
              <CardDescription>
                Personaliza el comportamiento del asistente educativo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Opciones generales</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="toggle-active">Activar asistente</Label>
                        <p className="text-sm text-muted-foreground">
                          Habilita o deshabilita el asistente para todos los usuarios
                        </p>
                      </div>
                      <Switch id="toggle-active" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="toggle-notifications">Notificaciones</Label>
                        <p className="text-sm text-muted-foreground">
                          Recibe notificaciones sobre nuevas consultas
                        </p>
                      </div>
                      <Switch id="toggle-notifications" defaultChecked />
                    </div>
                    
                    <Separator />
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="toggle-history">Guardar historial</Label>
                        <p className="text-sm text-muted-foreground">
                          Mantener registro de las conversaciones de los estudiantes
                        </p>
                      </div>
                      <Switch id="toggle-history" defaultChecked />
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div>
                  <h3 className="text-lg font-medium mb-4">Configuración API</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="api-url">URL de la API</Label>
                      <Input 
                        id="api-url" 
                        defaultValue="https://lapiceroazul4.app.n8n.cloud/webhook-test/1c127f31-7d4a-4836-bbdb-9fb6097d9b8e" 
                        readOnly
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="api-key">Clave API (opcional)</Label>
                      <Input 
                        id="api-key" 
                        placeholder="Ingresa una clave API si es necesario" 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Restaurar valores</Button>
              <Button>Guardar cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Admin;
