import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AdminSidebar } from '@/components/AdminSidebar';
import { MarkdownEditor } from '@/components/MarkdownEditor';
import { toast } from '@/hooks/use-toast';
import { 
  Shield, Plus, Edit, Trash2, Eye, Send,
  TrendingUp, Users, CreditCard, Activity,
  CheckCircle, Clock, XCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const Admin: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // Dashboard data
  const [stats, setStats] = useState({
    totalCards: 0,
    activeCards: 0,
    totalUsers: 0,
    templates: 0,
    announcements: 0,
    pendingFeedback: 0,
  });
  
  // Section-specific data
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [feedback, setFeedback] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedDoc, setSelectedDoc] = useState<string>('');
  const [docContent, setDocContent] = useState<string>('');
  
  // Form states
  const [announcementForm, setAnnouncementForm] = useState({
    title: '',
    content: '',
    type: 'info',
    priority: 'normal',
    sendToAll: false,
  });

  useEffect(() => {
    checkAdminAccess();
  }, [user]);

  useEffect(() => {
    if (isAdmin && activeSection === 'dashboard') {
      loadDashboardData();
    } else if (isAdmin && activeSection === 'announcements') {
      loadAnnouncements();
    } else if (isAdmin && activeSection === 'feedback') {
      loadFeedback();
    } else if (isAdmin && activeSection === 'users') {
      loadUsers();
    } else if (isAdmin && activeSection === 'templates') {
      loadTemplates();
    }
  }, [isAdmin, activeSection]);

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
    } catch (error) {
      console.error('Admin check error:', error);
      navigate('/dashboard');
    } finally {
      setLoading(false);
    }
  };

  const loadDashboardData = async () => {
    try {
      const [cardsRes, usersRes, templatesRes, announcementsRes, feedbackRes] = await Promise.all([
        supabase.from('digital_cards').select('id, is_active', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('templates').select('id', { count: 'exact' }),
        supabase.from('announcements').select('id', { count: 'exact' }),
        supabase.from('feedback_submissions').select('id, status', { count: 'exact' }),
      ]);

      setStats({
        totalCards: cardsRes.count || 0,
        activeCards: cardsRes.data?.filter(c => c.is_active).length || 0,
        totalUsers: usersRes.count || 0,
        templates: templatesRes.count || 0,
        announcements: announcementsRes.count || 0,
        pendingFeedback: feedbackRes.data?.filter(f => f.status === 'pending').length || 0,
      });
    } catch (error) {
      console.error('Error loading dashboard:', error);
    }
  };

  const loadAnnouncements = async () => {
    const { data } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setAnnouncements(data);
  };

  const loadFeedback = async () => {
    const { data } = await supabase
      .from('feedback_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setFeedback(data);
  };

  const loadUsers = async () => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    if (data) setUsers(data);
  };

  const loadTemplates = async () => {
    const { data } = await supabase
      .from('templates')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setTemplates(data);
  };

  const handleCreateAnnouncement = async () => {
    try {
      const { data: announcement, error } = await supabase
        .from('announcements')
        .insert({
          title: announcementForm.title,
          content: announcementForm.content,
          type: announcementForm.type,
          priority: announcementForm.priority,
          send_to_all: announcementForm.sendToAll,
          is_published: true,
          created_by: user?.id,
        })
        .select()
        .single();

      if (error) throw error;

      // If sending to all users, create announcement recipients
      if (announcementForm.sendToAll) {
        const { data: allUsers } = await supabase.from('profiles').select('user_id');
        
        if (allUsers && allUsers.length > 0) {
          const recipients = allUsers.map(u => ({
            announcement_id: announcement.id,
            user_id: u.user_id,
          }));

          await supabase.from('announcements_recipients').insert(recipients);
        }
      }

      toast({
        title: 'Success',
        description: 'Announcement created and sent',
      });

      setAnnouncementForm({
        title: '',
        content: '',
        type: 'info',
        priority: 'normal',
        sendToAll: false,
      });

      loadAnnouncements();
    } catch (error: any) {
      console.error('Error creating announcement:', error);
      toast({
        title: 'Error',
        description: 'Failed to create announcement',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateFeedbackStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('feedback_submissions')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: 'Success',
        description: 'Status updated',
      });

      loadFeedback();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update status',
        variant: 'destructive',
      });
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

  if (!isAdmin) return null;

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-8 py-8">
          {/* Dashboard Section */}
          {activeSection === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Dashboard</h1>
                <p className="text-muted-foreground">System overview and analytics</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <CreditCard className="w-4 h-4" />
                      Total Cards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalCards}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stats.activeCards} active</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      Total Users
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.totalUsers}</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                      <Activity className="w-4 h-4" />
                      Pending Feedback
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{stats.pendingFeedback}</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Activity feed coming soon...</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Announcements Section */}
          {activeSection === 'announcements' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Announcements</h1>
                <p className="text-muted-foreground">Create and manage system announcements</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Create Announcement</CardTitle>
                  <CardDescription>Send announcements to users</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input
                      value={announcementForm.title}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, title: e.target.value })}
                      placeholder="Announcement title"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Content</Label>
                    <Textarea
                      value={announcementForm.content}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, content: e.target.value })}
                      placeholder="Announcement content"
                      rows={4}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select
                        value={announcementForm.type}
                        onValueChange={(v) => setAnnouncementForm({ ...announcementForm, type: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Priority</Label>
                      <Select
                        value={announcementForm.priority}
                        onValueChange={(v) => setAnnouncementForm({ ...announcementForm, priority: v })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="normal">Normal</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={announcementForm.sendToAll}
                      onChange={(e) => setAnnouncementForm({ ...announcementForm, sendToAll: e.target.checked })}
                      className="rounded"
                    />
                    <Label>Send to all users</Label>
                  </div>

                  <Button onClick={handleCreateAnnouncement}>
                    <Send className="w-4 h-4 mr-2" />
                    Send Announcement
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Announcements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {announcements.map((ann) => (
                      <div key={ann.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{ann.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{ann.content.substring(0, 100)}...</p>
                          <div className="flex gap-2 mt-2">
                            <Badge>{ann.type}</Badge>
                            <Badge variant="outline">{ann.priority}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Feedback Section */}
          {activeSection === 'feedback' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Feedback & Support</h1>
                <p className="text-muted-foreground">Manage user feedback and support tickets</p>
              </div>

              <div className="space-y-4">
                {feedback.map((item) => (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-lg">{item.subject}</CardTitle>
                          <CardDescription className="mt-1">
                            From: {item.user_name} ({item.user_email})
                          </CardDescription>
                        </div>
                        <Badge>{item.type}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm">{item.content}</p>
                      
                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {item.ip_address && <span>IP: {item.ip_address}</span>}
                        {item.user_phone && <span>Phone: {item.user_phone}</span>}
                        <span>Date: {new Date(item.created_at).toLocaleDateString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Select
                          value={item.status}
                          onValueChange={(v) => handleUpdateFeedbackStatus(item.id, v)}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                            <SelectItem value="resolved">Resolved</SelectItem>
                            <SelectItem value="closed">Closed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Users Section */}
          {activeSection === 'users' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">User Management</h1>
                <p className="text-muted-foreground">View and manage user accounts</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {users.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{user.display_name}</p>
                          <p className="text-sm text-muted-foreground">{user.user_id}</p>
                        </div>
                        <Badge>{user.role || 'member'}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Templates Section */}
          {activeSection === 'templates' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Templates</h1>
                <p className="text-muted-foreground">Manage card templates</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <CardTitle className="text-base">{template.name}</CardTitle>
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
              </div>
            </div>
          )}

          {/* Documentation Section */}
          {activeSection === 'docs' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">Documentation Editor</h1>
                <p className="text-muted-foreground">Edit API docs and guides using markdown</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Edit Documentation</CardTitle>
                  <CardDescription>Use markdown to format your content</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Document</Label>
                    <Select value={selectedDoc} onValueChange={setSelectedDoc}>
                      <SelectTrigger>
                        <SelectValue placeholder="Choose a document" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="api-guide">API Guide</SelectItem>
                        <SelectItem value="getting-started">Getting Started</SelectItem>
                        <SelectItem value="features">Features</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {selectedDoc && (
                    <>
                      <MarkdownEditor
                        value={docContent}
                        onChange={setDocContent}
                        placeholder="Write your documentation in markdown..."
                      />
                      <Button>Save Changes</Button>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {/* Settings Section */}
          {activeSection === 'settings' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">System Settings</h1>
                <p className="text-muted-foreground">Configure system-wide settings</p>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>API Keys</CardTitle>
                  <CardDescription>Manage external API integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">API key management coming soon...</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Admin;
