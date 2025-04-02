
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  BookOpen, 
  MessageSquare, 
  Settings, 
  Menu, 
  X, 
  FileText,
  Home
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };
  
  const NavItem = ({ 
    to, 
    icon: Icon, 
    label 
  }: { 
    to: string; 
    icon: React.ElementType; 
    label: string;
  }) => {
    const isActive = location.pathname === to;
    return (
      <Link 
        to={to}
        className={cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          "hover:bg-sidebar-accent",
          isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : "text-sidebar-foreground"
        )}
      >
        <Icon size={20} />
        {!collapsed && <span>{label}</span>}
      </Link>
    );
  };

  return (
    <aside
      className={cn(
        "bg-sidebar h-screen flex flex-col border-r border-sidebar-border",
        "transition-all duration-300 ease-in-out",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-duck rounded-full flex items-center justify-center">
            <img src="public/pato.png" alt="Logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <h1 className="text-sidebar-foreground font-bold">Pato Donald</h1>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="text-sidebar-foreground hover:bg-sidebar-accent"
        >
          {collapsed ? <Menu size={20} /> : <X size={20} />}
        </Button>
      </div>

      <div className="flex flex-col gap-1 p-3 flex-grow">
        <NavItem to="/" icon={Home} label="Inicio" />
        <NavItem to="/ruta-estudio" icon={BookOpen} label="Ruta de Estudio" />
        <NavItem to="/asistente" icon={MessageSquare} label="Asistente" />
        <NavItem to="/admin" icon={Settings} label="Administración" />
      </div>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
              <span className="text-sidebar-accent-foreground font-bold">U</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sidebar-foreground text-sm font-medium">Usuario</span>
              <span className="text-sidebar-foreground/60 text-xs">Estudiante</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
