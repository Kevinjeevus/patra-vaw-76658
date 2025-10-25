import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Shield,
  LayoutDashboard,
  Megaphone,
  Palette,
  Users,
  MessageSquare,
  FileText,
  Key,
  LogOut,
} from 'lucide-react';

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ activeSection, onSectionChange }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'announcements', label: 'Announcements', icon: Megaphone },
    { id: 'feedback', label: 'Feedback & Support', icon: MessageSquare },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'templates', label: 'Templates', icon: Palette },
    { id: 'docs', label: 'Documentation', icon: FileText },
    { id: 'settings', label: 'Settings', icon: Key },
  ];

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border sticky top-0">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <Shield className="w-8 h-8 text-primary" />
          <div>
            <h2 className="font-bold text-xl">Admin Panel</h2>
            <p className="text-xs text-muted-foreground">System Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        <div className="mt-8 pt-8 border-t border-border">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/dashboard')}
          >
            <LogOut className="w-4 h-4 mr-2" />
            Exit Admin
          </Button>
        </div>
      </div>
    </aside>
  );
};
