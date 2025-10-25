import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, Users, Bell, FileText, Settings, BarChart3, 
  Key, Plus, Edit, Trash2, Eye, LogOut, ArrowLeft,
  Megaphone, Palette, Database, Activity
} from 'lucide-react';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  const checkAdminAccess = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin')
        .single();

      if (error || !data) {
        toast({
          title: 'Access Denied',
          description: 'You do not have admin privileges.',
          variant: 'destructive',
        });
        navigate('/dashboard');
        return;
      }

      setIsAdmin(true);
      loadAdminData();
    } catch (error) {
      console.error('Admin check error:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadAdminData = async () => {
    try {
      const [announcementsRes, templatesRes, cardsRes] = await Promise.all([
        supabase.from('announcements').select('*').order('created_at', { ascending: false }),
        supabase.from('templates').select('*').order('created_at', { ascending: false }),
        supabase.from('digital_cards').select('*, card_analytics(count)').limit(100)
      ]);

      if (announcementsRes.data) setAnnouncements(announcementsRes.data);
      if (templatesRes.data) setTemplates(templatesRes.data);
      
      // Calculate analytics
      if (cardsRes.data) {
        const totalCards = cardsRes.data.length;
        const activeCards = cardsRes.data.filter(c => c.is_active).length;
        setAnalytics({ totalCards, activeCards });
      }
    } catch (error) {
      console.error('Error loading admin data:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <Shield className="w-16 h-16 mx-auto mb-4 animate-pulse text-primary" />
          <p className="text-muted-foreground">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold flex items-center gap-2">
                  <Shield className="w-6 h-6 text-primary" />
                  Admin Panel
                </h1>
                <p className="text-sm text-muted-foreground">
                  System management and analytics
                </p>
              </div>
            </div>
            <Button variant="outline" onClick={() => navigate('/dashboard')}>
              <LogOut className="w-4 h-4 mr-2" />
              Exit Admin
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Overview */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics?.totalCards || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Cards</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{analytics?.activeCards || 0}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Templates</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{templates.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{announcements.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="announcements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="announcements">
              <Megaphone className="w-4 h-4 mr-2" />
              Announcements
            </TabsTrigger>
            <TabsTrigger value="templates">
              <Palette className="w-4 h-4 mr-2" />
              Templates
            </TabsTrigger>
            <TabsTrigger value="users">
              <Users className="w-4 h-4 mr-2" />
              Users
            </TabsTrigger>
            <TabsTrigger value="analytics">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="announcements" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Announcements Management</CardTitle>
                <CardDescription>Create and manage system announcements, news, and changelogs</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Announcement
                </Button>
                
                <div className="space-y-2">
                  {announcements.map((announcement) => (
                    <div key={announcement.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-semibold">{announcement.title}</h4>
                        <p className="text-sm text-muted-foreground">{announcement.content.substring(0, 100)}...</p>
                        <div className="flex gap-2 mt-2">
                          <Badge>{announcement.type}</Badge>
                          <Badge variant={announcement.is_published ? "default" : "secondary"}>
                            {announcement.is_published ? 'Published' : 'Draft'}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {announcements.length === 0 && (
                    <p className="text-center text-muted-foreground py-8">No announcements yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Templates Management</CardTitle>
                <CardDescription>Manage card and profile templates</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="mb-4">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {templates.map((template) => (
                    <Card key={template.id}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <CardTitle className="text-base">{template.name}</CardTitle>
                          <Badge>{template.category}</Badge>
                        </div>
                        <CardDescription>{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  {templates.length === 0 && (
                    <p className="col-span-3 text-center text-muted-foreground py-8">No templates yet</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>View and manage user accounts and roles</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">User management interface coming soon...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Analytics</CardTitle>
                <CardDescription>View detailed analytics and insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Most Viewed Profiles</h4>
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">Most Shared Cards</h4>
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <h4 className="font-semibold mb-2">User Growth</h4>
                    <p className="text-sm text-muted-foreground">Coming soon...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Settings</CardTitle>
                <CardDescription>Manage API keys, integrations, and system configuration</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Key className="w-4 h-4" />
                        API Keys
                      </h4>
                      <Button variant="outline" size="sm">Manage</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Configure external API keys and integrations</p>
                  </div>
                  
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <Database className="w-4 h-4" />
                        Database
                      </h4>
                      <Button variant="outline" size="sm">View</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Database configuration and management</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Documentation
                      </h4>
                      <Button variant="outline" size="sm" onClick={() => navigate('/docs')}>Edit Docs</Button>
                    </div>
                    <p className="text-sm text-muted-foreground">Edit API documentation and guides</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
