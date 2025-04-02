
import React, { useState, useRef, useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Send, Plus, FileText, BookOpen } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Asistente = () => {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      sender: 'bot', 
      content: '¡Hola! Soy Pato Donald, tu asistente educativo. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Agregar mensaje del usuario
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Conexión con el endpoint de n8n
      const response = await fetch('https://lapiceroazul4.app.n8n.cloud/webhook-test/1c127f31-7d4a-4836-bbdb-9fb6097d9b8e', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error('Error al comunicarse con el asistente');
      }

      const data = await response.json();
      
      // Simular una respuesta si no recibimos una válida del endpoint
      const botResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        content: data.output || 'Lo siento, no pude procesar tu consulta en este momento. Por favor, intenta nuevamente más tarde.',
        timestamp: new Date()
      };

      setTimeout(() => {
        setMessages((prev) => [...prev, botResponse]);
        setIsLoading(false);
      }, 500); // Pequeño retraso para la experiencia de usuario
      
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
      
      // Mensaje de error
      toast({
        title: "Error de conexión",
        description: "No se pudo conectar con el asistente. Intenta nuevamente.",
        variant: "destructive"
      });
      
      // Respuesta de error como bot
      const errorResponse = {
        id: Date.now() + 1,
        sender: 'bot',
        content: 'Parece que estoy teniendo problemas para conectarme. Por favor, intenta nuevamente en unos momentos.',
        timestamp: new Date()
      };
      
      setMessages((prev) => [...prev, errorResponse]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Sugerencias predefinidas
  const suggestions = [
    "¿Cómo funciona la derivada en cálculo?",
    "Explícame el teorema de Pitágoras",
    "¿Qué es la fotosíntesis?",
    "Ayúdame con ecuaciones de segundo grado"
  ];

  return (
    <MainLayout className="p-0 flex flex-col h-screen overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-duck rounded-full flex items-center justify-center">
              <img src="public/pato.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Pato Donald</h1>
              <p className="text-xs text-muted-foreground">Asistente Educativo</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <FileText size={16} className="mr-2" />
              Historial
            </Button>
            <Button variant="outline" size="sm">
              <BookOpen size={16} className="mr-2" />
              Recursos
            </Button>
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`
                  ${message.sender === 'user' ? 'user-bubble' : 'bot-bubble'}
                  relative group
                `}
              >
                {message.content}
                <span className="text-xs text-muted-foreground/70 absolute -bottom-5 opacity-0 group-hover:opacity-100 transition-opacity">
                  {formatTime(message.timestamp)}
                </span>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bot-bubble">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Sugerencias */}
        {messages.length < 3 && (
          <div className="px-4 py-2">
            <p className="text-sm text-muted-foreground mb-2">Sugerencias:</p>
            <div className="flex flex-wrap gap-2">
              {suggestions.map((suggestion, index) => (
                <Button 
                  key={index} 
                  variant="outline" 
                  size="sm" 
                  className="text-xs"
                  onClick={() => {
                    setInputValue(suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>
        )}

        {/* Input Area */}
        <div className="p-4 border-t">
          <div className="flex space-x-2">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Escribe tu pregunta..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button 
              onClick={handleSendMessage} 
              disabled={!inputValue.trim() || isLoading}
              size="icon"
            >
              <Send size={18} />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Pato Donald está entrenado con los materiales de tus cursos para brindarte asistencia personalizada.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Asistente;
