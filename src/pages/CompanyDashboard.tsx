import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import {
  Plus, Users, CreditCard, BarChart3, Settings, LogOut,
  Eye, Edit3, Copy, RefreshCw, Send, AlertCircle,
  UserCheck, UserX, Link as LinkIcon, Globe, ShieldCheck, UserPlus, Camera,
  ArrowLeft, FileSpreadsheet, Upload, Download, Info, Check, Trash2, ListChecks,
  Loader2, Smartphone, User, Mail, Phone
} from 'lucide-react';
import { CorporateIDCard } from '@/components/card/CorporateIDCard';


import { Checkbox } from '@/components/ui/checkbox';

type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Profile {
  id: string;
  display_name: string;
  company_name: string;
  invite_code: string;
  account_type: string;
  board_member_count: number;
  employee_invite_count: number;
  invite_parameters: Json;
  display_parameters: Json;
  payment_due_date: string | null;
  vanity_url: string | null;
  company_logo_url?: string;
}

interface DigitalCard {
  id: string;
  title: string;
  is_approved: boolean;
  is_active: boolean;
  created_at: string;
  vanity_url: string;
}

interface Employee {
  id: string;
  employee_user_id: string;
  employee_display_id: string;
  profile_display_id: string;
  status: string;
  joined_at: string;
  designation: string;
  is_approved: boolean;
  data_submitted: any;
  staff_id?: string;
  profiles: {
    display_name: string;
    avatar_url: string;
    vanity_url: string;
  };
}

const AVAILABLE_PARAMETERS = [
  { id: 'display_name', label: 'Full Name', required: true },
  { id: 'email', label: 'Email', required: true },
  { id: 'phone', label: 'Phone Number', required: false },
  { id: 'avatar_url', label: 'Profile Picture', required: false },
];

export const CompanyDashboard: React.FC = () => {
  const { user, loading: loadingAuth, signOut } = useAuth();
  const navigate = useNavigate();
  const { tab } = useParams<{ tab: string }>();

  // Map URL param to Tab Value
  const getTabFromUrl = (urlParam?: string) => {
    switch (urlParam) {
      case 'employees': return 'staff';
      case 'leadership': return 'directors';
      case 'invite': return 'invites';
      case 'data-collection': return 'parameters';
      case 'id-design': return 'display';
      case 'branding': return 'branding';
      default: return 'staff';
    }
  };

  // Map Tab Value to URL param
  const getUrlFromTab = (tabValue: string) => {
    switch (tabValue) {
      case 'staff': return 'employees';
      case 'directors': return 'leadership';
      case 'invites': return 'invite';
      case 'parameters': return 'data-collection';
      case 'display': return 'id-design';
      case 'branding': return 'branding';
      default: return 'employees';
    }
  };

  const activeTab = getTabFromUrl(tab);

  const handleTabChange = (value: string) => {
    navigate(`/dashboard/${getUrlFromTab(value)}`);
  };

  const [profile, setProfile] = useState<Profile | null>(null);
  const [cards, setCards] = useState<DigitalCard[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);
  const [displayParameters, setDisplayParameters] = useState<string[]>([]);
  const [companyVanity, setCompanyVanity] = useState('');
  const [editingDesignation, setEditingDesignation] = useState<{ id: string, value: string } | null>(null);
  const [showAddStaffDialog, setShowAddStaffDialog] = useState(false);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [manualStaffData, setManualStaffData] = useState<Record<string, string>>({});
  const [isProcessingBulk, setIsProcessingBulk] = useState(false);
  const [importStatus, setImportStatus] = useState<{ total: number, current: number } | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [isAddingStaff, setIsAddingStaff] = useState(false);
  const [companyLogoFile, setCompanyLogoFile] = useState<File | null>(null);
  const [isUploadingLogo, setIsUploadingLogo] = useState(false);

  useEffect(() => {
    // Only proceed once auth has finished loading the session
    if (!loadingAuth) {
      if (user) {
        const loadAll = async () => {
          try {
            setLoading(true);
            const fetchedProfile = await fetchProfile();
            await fetchCards();
            if (fetchedProfile) {
              await fetchEmployees(fetchedProfile.id);
            }
          } catch (err) {
            console.error("Dashboard core loading failed:", err);
          } finally {
            setLoading(false);
          }
        };
        loadAll();
      } else {
        // If auth loaded but no user, stop loading (DashboardRouter handles redirect)
        setLoading(false);
      }
    }
  }, [user, loadingAuth]);

  const fetchProfile = async () => {
    if (!user) return null;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error) throw error;
      if (data.account_type !== 'company') {
        navigate('/dashboard');
        return null;
      }

      if (data.account_type === 'company' && !data.invite_code) {
        const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ invite_code: newCode })
          .eq('id', data.id);
        if (!updateError) data.invite_code = newCode;
      }

      setProfile(data);
      setCompanyVanity(data.vanity_url || '');

      const inviteParams = Array.isArray(data.invite_parameters)
        ? data.invite_parameters as string[]
        : ['display_name', 'email'];
      setSelectedParameters(inviteParams);

      const displayParams = Array.isArray(data.display_parameters)
        ? data.display_parameters as string[]
        : ['display_name', 'email', 'job_title'];
      setDisplayParameters(displayParams);

      return data;
    } catch (error: any) {
      console.error('Error fetching profile:', error);
      return null;
    }
  };

  const fetchCards = async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('digital_cards')
        .select('*')
        .eq('owner_user_id', user.id)
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCards(data || []);
    } catch (error: any) {
      console.error('Error fetching cards:', error);
    }
  };

  const fetchEmployees = async (companyId?: string) => {
    const idToUse = companyId || profile?.id;
    if (!idToUse) return;

    try {
      const { data, error } = await supabase
        .from('invited_employees')
        .select('*')
        .eq('company_profile_id', idToUse)
        .order('joined_at', { ascending: false });

      if (error) throw error;
      
      // Map the data to match Employee interface
      const mappedEmployees = (data || []).map(emp => ({
        ...emp,
        profiles: null as any
      }));
      
      setEmployees(mappedEmployees as any);
    } catch (error: any) {
      console.error('Error fetching employees:', error);
    }
  };

  const totalViews = employees.reduce((sum, emp) => sum + (Math.floor(Math.random() * 50)), 0); // Simulated for now


  const handleUpdateVanity = async () => {
    if (!profile) return;
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ vanity_url: companyVanity })
        .eq('id', profile.id);
      if (error) throw error;
      toast({ title: "Success", description: "Company vanity URL updated" });
      fetchProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const generateStaffId = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let staffId = '';
    for (let i = 0; i < 6; i++) {
      staffId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return staffId;
  };

  const handleApproveEmployee = async (empId: string, approve: boolean) => {
    try {
      if (approve) {
        // Generate unique staff_id for approved employees
        let staffId = generateStaffId();
        let isUnique = false;
        let attempts = 0;

        // Ensure staff_id is unique (max 10 attempts)
        while (!isUnique && attempts < 10) {
          const { data: existing } = await supabase
            .from('invited_employees')
            .select('id')
            .eq('staff_id', staffId)
            .maybeSingle();

          if (!existing) {
            isUnique = true;
          } else {
            staffId = generateStaffId();
            attempts++;
          }
        }

        const { error } = await supabase
          .from('invited_employees')
          .update({
            is_approved: true,
            status: 'joined',
            staff_id: staffId
          })
          .eq('id', empId);

        if (error) throw error;
        toast({ title: "Employee Approved", description: `Staff ID: ${staffId}` });
      } else {
        const { error } = await supabase
          .from('invited_employees')
          .update({ is_approved: false, status: 'rejected' })
          .eq('id', empId);

        if (error) throw error;
        toast({ title: "Employee Rejected" });
      }

      fetchEmployees();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleUpdateDesignation = async () => {
    if (!editingDesignation) return;
    try {
      const { error } = await supabase
        .from('invited_employees')
        .update({ designation: editingDesignation.value })
        .eq('id', editingDesignation.id);
      if (error) throw error;
      toast({ title: "Designation updated" });
      setEditingDesignation(null);
      fetchEmployees();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleRegenerateInviteCode = async () => {
    if (!profile) return;
    if (!confirm('Are you sure you want to regenerate the invite code? This will invalidate all existing invite links.')) return;

    try {
      const newCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      const { error } = await supabase
        .from('profiles')
        .update({ invite_code: newCode })
        .eq('id', profile.id);

      if (error) throw error;
      toast({ title: "Success", description: "Invite code regenerated successfully" });
      fetchProfile();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleDeleteCard = async (cardId: string) => {
    if (!confirm('Are you sure you want to delete this Leadership card? This action cannot be undone.')) return;

    try {
      const { error } = await supabase
        .from('digital_cards')
        .delete()
        .eq('id', cardId);

      if (error) throw error;
      toast({ title: "Success", description: "Leadership card deleted successfully" });
      fetchCards();
    } catch (error: any) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    }
  };

  const handleManualAdd = async () => {
    if (!profile || isAddingStaff) return;
    if (!user) {
      toast({ title: "Not signed in", description: "Please sign in and try again.", variant: "destructive" });
      return;
    }
    
    // Validate required fields
    if (!manualStaffData.display_name?.trim()) {
      toast({ title: "Missing name", description: "Please enter the staff member's full name.", variant: "destructive" });
      return;
    }
    if (!manualStaffData.email?.trim()) {
      toast({ title: "Missing email", description: "Please enter the staff member's email.", variant: "destructive" });
      return;
    }
    
    setIsAddingStaff(true);
    try {
      let avatarUrl = manualStaffData.avatar_url;

      if (selectedImage) {
        const fileExt = selectedImage.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        // Storage RLS for `avatars` requires the first folder to be the uploader's auth.uid()
        // policy: (storage.foldername(name))[1] = auth.uid()::text
        const filePath = `${user.id}/staff/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(filePath, selectedImage, {
            contentType: selectedImage.type || undefined,
            upsert: false,
          });

        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        avatarUrl = data.publicUrl;
      }

      console.log('Adding staff with company_profile_id:', profile.id);
      
      const { data, error } = await supabase
        .from('invited_employees')
        .insert({
          company_profile_id: profile.id,
          invite_code: profile.invite_code || 'MANUAL',
          status: 'invited',
          data_submitted: {
            ...manualStaffData,
            avatar_url: avatarUrl
          },
          designation: manualStaffData.job_title || ''
        })
        .select();

      if (error) {
        console.error('Insert error:', error);
        throw error;
      }
      
      console.log('Staff added successfully:', data);
      toast({ title: "Staff added successfully", description: `${manualStaffData.display_name} has been added to the directory.` });
      setShowAddStaffDialog(false);
      setManualStaffData({});
      setSelectedImage(null);
      fetchEmployees();
    } catch (error: any) {
      console.error('Error adding staff:', error);
      toast({ title: "Error adding staff", description: error.message, variant: "destructive" });
    } finally {
      setIsAddingStaff(false);
    }
  };

  const parseCSV = (csv: string) => {
    const lines = csv.split('\n');
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
    const results = [];

    for (let i = 1; i < lines.length; i++) {
      if (!lines[i].trim()) continue;
      const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''));
      const obj: any = {};
      headers.forEach((header, index) => {
        obj[header] = values[index];
      });
      results.push(obj);
    }
    return results;
  };

  const handleBulkImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    setIsProcessingBulk(true);
    const reader = new FileReader();
    reader.onload = async (event) => {
      try {
        const text = event.target?.result as string;
        const data = parseCSV(text);
        setImportStatus({ total: data.length, current: 0 });

        for (let i = 0; i < data.length; i++) {
          const row = data[i];
          // Map CSV headers to internal data structure
          const submission: any = {
            display_name: row.FullName || row.DisplayName || row.Name,
            email: row.Email,
            phone: row.Phone || row.Contact,
            job_title: row.JobTitle || row.Designation || row.Role,
            address: row.Address || row.Location,
            bio: row.Bio || row.About
          };

          await supabase.from('invited_employees').insert({
            company_profile_id: profile.id,
            invite_code: profile.invite_code,
            status: 'invited',
            data_submitted: submission,
            designation: submission.job_title || ''
          });

          setImportStatus(prev => prev ? { ...prev, current: i + 1 } : null);
        }

        toast({ title: "Import completed", description: `Successfully imported ${data.length} staff members.` });
        setShowImportDialog(false);
        fetchEmployees();
      } catch (err: any) {
        toast({ title: "Import failed", description: err.message, variant: "destructive" });
      } finally {
        setIsProcessingBulk(false);
        setImportStatus(null);
      }
    };
    reader.readAsText(file);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: "Copied to clipboard", description: `${text} header is ready.` });
  };

  const currentInviteLink = `${window.location.origin}/invite?id=${profile?.invite_code}`;

  if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-slate-50/50">
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full"
              onClick={() => {
                if (window.history.length > 2) navigate(-1);
                else navigate('/');
              }}
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/dashboard')}>
              <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-slate-900">{profile?.company_name || 'Company'} Dashboard</h1>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest leading-none">Corporate Control Panel</p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="hidden sm:flex" onClick={() => navigate('/settings')}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="ghost" size="icon" className="sm:hidden" onClick={() => navigate('/settings')}>
              <Settings className="w-5 h-5 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" onClick={() => signOut()}>
              <LogOut className="w-5 h-5 text-slate-500" />
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-indigo-500 to-purple-600 text-white border-none shadow-lg">
            <CardHeader className="pb-2">
              <CardTitle className="text-indigo-100 text-sm font-medium uppercase tracking-wider">Total Staff</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{employees.filter(e => e.is_approved).length}</div>
              <p className="text-indigo-100/80 text-sm mt-1">Verified employees in your network</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-sm font-medium uppercase tracking-wider">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{employees.filter(e => !e.is_approved && e.status !== 'rejected').length}</div>
              <p className="text-slate-500 text-sm mt-1">New join requests waiting for you</p>
            </CardContent>
          </Card>
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-500 text-sm font-medium uppercase tracking-wider">Total Impressions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-slate-900">{totalViews}</div>
              <p className="text-slate-500 text-sm mt-1">Combined views across all staff</p>
            </CardContent>
          </Card>
        </div>


        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <div className="overflow-x-auto pb-2 scrollbar-none">
            <TabsList className="bg-white border border-slate-200 p-1 rounded-xl shadow-sm inline-flex min-w-max">
              <TabsTrigger value="staff" className="rounded-lg px-6">Staff Directory</TabsTrigger>
              <TabsTrigger value="directors" className="rounded-lg px-6">Leadership Cards</TabsTrigger>
              <TabsTrigger value="invites" className="rounded-lg px-6">Invite Links</TabsTrigger>
              <TabsTrigger value="parameters" className="rounded-lg px-6">Data Collection</TabsTrigger>
              <TabsTrigger value="display" className="rounded-lg px-6">ID Card Design</TabsTrigger>
              <TabsTrigger value="branding" className="rounded-lg px-6">Branding</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="staff">
            <Card className="shadow-md border-none overflow-hidden">
              <CardHeader className="bg-white border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <CardTitle>Employee Directory</CardTitle>
                  <CardDescription>Manage your staff, their designations, and access.</CardDescription>
                </div>
                <div className="flex w-full sm:w-auto gap-2">
                  <Button variant="outline" size="sm" onClick={() => fetchEmployees()} className="flex-1 sm:flex-initial">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Refresh
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowImportDialog(true)} className="flex-1 sm:flex-initial border-indigo-200 text-indigo-700 hover:bg-indigo-50">
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Bulk Import
                  </Button>
                  <Button size="sm" onClick={() => setShowAddStaffDialog(true)} className="bg-indigo-600 hover:bg-indigo-700 flex-1 sm:flex-initial shadow-md">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Staff
                  </Button>
                </div>
              </CardHeader>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-slate-50/50">
                      <TableHead className="min-w-[200px]">Employee</TableHead>
                      <TableHead className="min-w-[100px]">Staff ID</TableHead>
                      <TableHead className="min-w-[100px]">Profile ID</TableHead>
                      <TableHead className="min-w-[150px]">Designation</TableHead>
                      <TableHead className="min-w-[150px]">Joined Date</TableHead>
                      <TableHead className="min-w-[120px]">Status</TableHead>
                      <TableHead className="text-right min-w-[150px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {employees.map((emp) => (
                      <TableRow key={emp.id} className="hover:bg-slate-50/50 transition-colors">
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-slate-200 rounded-full flex items-center justify-center overflow-hidden">
                              {emp.data_submitted?.avatar_url ? (
                                <img src={emp.data_submitted.avatar_url} alt="" className="w-full h-full object-cover" />
                              ) : (
                                <Users className="w-5 h-5 text-slate-400" />
                              )}
                            </div>
                            <div>
                              <div className="text-slate-900">{emp.data_submitted?.display_name || 'New User'}</div>
                              <div className="text-xs text-slate-500">{emp.data_submitted?.email || 'No email provided'}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm font-mono">
                          {emp.staff_id ? (
                            <a
                              href={`/${profile?.vanity_url}/${emp.staff_id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 hover:underline"
                            >
                              {emp.staff_id}
                            </a>
                          ) : (
                            <span className="text-slate-400">Pending</span>
                          )}
                        </TableCell>
                        <TableCell className="text-slate-600 text-sm font-mono">
                          {emp.profile_display_id || '—'}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-slate-600">{emp.designation || 'Not Assigned'}</span>
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400" onClick={() => setEditingDesignation({ id: emp.id, value: emp.designation || '' })}>
                                  <Edit3 className="w-3.5 h-3.5" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Update Designation</DialogTitle>
                                  <DialogDescription>Assign a professional title for {emp.profiles?.display_name}.</DialogDescription>
                                </DialogHeader>
                                <Input
                                  value={editingDesignation?.value || ''}
                                  onChange={(e) => setEditingDesignation(prev => prev ? { ...prev, value: e.target.value } : null)}
                                  placeholder="e.g. Senior Software Engineer"
                                />
                                <DialogFooter>
                                  <Button onClick={handleUpdateDesignation}>Save Changes</Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </TableCell>
                        <TableCell className="text-slate-500 text-sm">
                          {new Date(emp.joined_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          {emp.is_approved ? (
                            <Badge className="bg-green-100 text-green-700 hover:bg-green-100 border-none">Active</Badge>
                          ) : emp.status === 'rejected' ? (
                            <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-none">Rejected</Badge>
                          ) : (
                            <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-none animate-pulse">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          {!emp.is_approved && emp.status !== 'rejected' ? (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50" onClick={() => handleApproveEmployee(emp.id, true)}>
                                <UserCheck className="w-4 h-4 mr-1" /> Approve
                              </Button>
                              <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => handleApproveEmployee(emp.id, false)}>
                                <UserX className="w-4 h-4 mr-1" /> Reject
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-2">
                              {emp.profiles?.vanity_url ? (
                                <Button size="sm" variant="ghost" className="text-indigo-600" onClick={() => window.open(`/${profile?.vanity_url}?userid=${emp.profiles.vanity_url}`, '_blank')}>
                                  <LinkIcon className="w-4 h-4 mr-1" /> View ID
                                </Button>
                              ) : (
                                <span className="text-xs text-slate-400 italic mr-3">Pending Activation</span>
                              )}
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button size="sm" variant="ghost" className="text-slate-500">View Data</Button>
                                </DialogTrigger>
                                <DialogContent className="max-h-[90vh] overflow-y-auto max-w-md">
                                  <DialogHeader>
                                    <DialogTitle>Employee Profile Data</DialogTitle>
                                    <DialogDescription>Review details submitted by {emp.profiles?.display_name}</DialogDescription>
                                  </DialogHeader>
                                  <div className="py-4 space-y-6">
                                    {/* Header Section: Image & Name */}
                                    <div className="flex flex-col items-center justify-center text-center space-y-4 pb-6 border-b border-slate-100">
                                      <div className="w-32 h-32 bg-slate-100 rounded-[2rem] overflow-hidden shadow-sm border-4 border-white ring-1 ring-slate-100">
                                        {emp.data_submitted?.avatar_url ? (
                                          <img
                                            src={String(emp.data_submitted.avatar_url)}
                                            alt={String(emp.profiles?.display_name)}
                                            className="w-full h-full object-cover"
                                            onError={(e) => {
                                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${emp.profiles?.display_name}&background=random`;
                                            }}
                                          />
                                        ) : (
                                          <div className="w-full h-full flex items-center justify-center text-slate-300">
                                            <User className="w-16 h-16" />
                                          </div>
                                        )}
                                      </div>
                                      <div>
                                        <h3 className="text-xl font-bold text-slate-900">{String(emp.data_submitted?.display_name || 'Unknown Name')}</h3>
                                        <div className="flex items-center justify-center gap-2 text-slate-500 mt-1">
                                          <Badge variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">
                                            {emp.designation || 'No Designation'}
                                          </Badge>
                                        </div>
                                      </div>

                                      {/* Quick Actions */}
                                      <div className="flex gap-2 w-full justify-center">
                                        {emp.data_submitted?.email && (
                                          <a href={`mailto:${emp.data_submitted.email}`} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                            <Mail className="w-4 h-4" />
                                          </a>
                                        )}
                                        {emp.data_submitted?.phone && (
                                          <a href={`tel:${emp.data_submitted.phone}`} className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                                            <Phone className="w-4 h-4" />
                                          </a>
                                        )}
                                      </div>
                                    </div>

                                    {/* Detailed Fields */}
                                    <div className="space-y-4">
                                      <h4 className="font-semibold text-sm text-slate-900 uppercase tracking-wider mb-3">Contact & Details</h4>

                                      <div className="grid grid-cols-1 gap-4">
                                        {Object.entries(emp.data_submitted || {})
                                          .filter(([key]) => !['avatar_url', 'display_name'].includes(key))
                                          .map(([key, value]) => (
                                            <div key={key} className="flex flex-col bg-slate-50 p-3 rounded-lg border border-slate-100">
                                              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                                {key.replace(/_/g, ' ')}
                                              </span>
                                              <span className="text-sm font-medium text-slate-700 break-words">
                                                {String(value) || '-'}
                                              </span>
                                            </div>
                                          ))
                                        }
                                      </div>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="directors">
            <Card className="shadow-md border-none">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Leadership & Executive Cards</CardTitle>
                  <CardDescription>Manage cards for your leadership team and key personnel. (Limited to 2 free cards)</CardDescription>
                </div>
                <Button
                  size="sm"
                  disabled={cards.length >= 2}
                  className="bg-indigo-600 hover:bg-indigo-700 w-full sm:w-auto"
                  onClick={() => navigate('/editor?new=true')}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Leadership Card
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cards.map((card) => (
                    <div key={card.id} className="p-4 border border-slate-200 rounded-2xl bg-white shadow-sm flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600">
                          <CreditCard className="w-6 h-6" />
                        </div>
                        <div>
                          <h4 className="font-bold text-slate-900">{card.title}</h4>
                          <p className="text-xs text-slate-500 font-mono">{window.location.host}/{card.vanity_url}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" onClick={() => navigate(`/editor?id=${card.id}`)}>
                          <Edit3 className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => window.open(`/${card.vanity_url}`, '_blank')}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteCard(card.id)}>
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  {cards.length === 0 && (
                    <div className="col-span-2 py-12 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                      <CreditCard className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                      <p className="text-slate-500 font-medium">No leadership cards created yet</p>
                      <p className="text-xs text-slate-400 mt-1">Create up to 2 high-priority cards for your leadership team</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="invites">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Company Invitation System</CardTitle>
                <CardDescription>Generate and manage unique links for employees to join your organization.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                <div className="p-6 bg-slate-900 rounded-2xl text-white relative overflow-hidden">
                  <div className="relative z-10">
                    <Label className="text-slate-400 text-xs uppercase font-bold tracking-widest mb-4 block">Active Invite Link</Label>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <div className="flex-1 bg-white/10 backdrop-blur-md rounded-xl p-4 font-mono text-sm sm:text-lg border border-white/10 select-all overflow-hidden text-ellipsis break-all">
                        {currentInviteLink}
                      </div>
                      <Button className="h-12 sm:h-full py-4 bg-white text-slate-900 hover:bg-slate-100" onClick={() => {
                        navigator.clipboard.writeText(currentInviteLink);
                        toast({ title: "Copied!", description: "Invite link copied to clipboard" });
                      }}>
                        <Copy className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <UserPlus className="w-32 h-32" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 border border-slate-200 rounded-2xl space-y-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-2">
                      <RefreshCw className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900">Security Control</h4>
                    <p className="text-sm text-slate-500">Regenerating the link will invalidate all previous invite codes immediately.</p>
                    <Button variant="outline" className="w-full" onClick={handleRegenerateInviteCode}>Regenerate Code</Button>
                  </div>
                  <div className="p-6 border border-slate-200 rounded-2xl space-y-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-2">
                      <BarChart3 className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-slate-900">Invite Usage</h4>
                    <p className="text-sm text-slate-500">You have {employees.length} employees currently using this invite system.</p>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-green-500 h-full w-[45%]" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Company Details & Branding</CardTitle>
                <CardDescription>Complete your company profile with essential business information.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Essential Information */}
                <div className="space-y-6">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    Essential Information
                    <Badge variant="destructive" className="ml-2">Required</Badge>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Company Name */}
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Company Name *</Label>
                      <Input
                        id="company-name"
                        value={profile?.company_name || ''}
                        placeholder="Enter company name"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* Company Email */}
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Company Email *</Label>
                      <Input
                        id="company-email"
                        type="email"
                        placeholder="contact@company.com"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* Company Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Company Phone *</Label>
                      <Input
                        id="company-phone"
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* Company Logo Upload */}
                    <div className="space-y-2">
                      <Label htmlFor="company-logo">Company Logo *</Label>
                      <div className="flex flex-col gap-3">
                        <div className="group relative w-full h-32 bg-slate-100 rounded-xl overflow-hidden border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors cursor-pointer flex items-center justify-center">
                          {companyLogoFile ? (
                            <img
                              src={URL.createObjectURL(companyLogoFile)}
                              alt="Logo Preview"
                              className="max-h-full max-w-full object-contain p-2"
                            />
                          ) : profile?.company_logo_url ? (
                            <img
                              src={profile.company_logo_url}
                              alt="Company Logo"
                              className="max-h-full max-w-full object-contain p-2"
                            />
                          ) : (
                            <div className="flex flex-col items-center gap-2 text-slate-400">
                              <Camera className="w-8 h-8" />
                              <span className="text-xs">Click to upload logo</span>
                            </div>
                          )}
                          <input
                            type="file"
                            id="company-logo"
                            className="absolute inset-0 opacity-0 cursor-pointer"
                            accept="image/*"
                            onChange={(e) => {
                              if (e.target.files?.[0]) {
                                setCompanyLogoFile(e.target.files[0]);
                              }
                            }}
                          />
                          <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                            {profile?.company_logo_url || companyLogoFile ? 'Click to change' : 'Click to upload'}
                          </div>
                        </div>
                        {companyLogoFile && (
                          <Button
                            size="sm"
                            className="bg-indigo-600 hover:bg-indigo-700"
                            disabled={isUploadingLogo}
                            onClick={async () => {
                              if (!companyLogoFile || !user || !profile) return;
                              setIsUploadingLogo(true);
                              try {
                                const fileExt = companyLogoFile.name.split('.').pop();
                                const fileName = `logo-${Date.now()}.${fileExt}`;
                                const filePath = `${user.id}/company/${fileName}`;

                                const { error: uploadError } = await supabase.storage
                                  .from('avatars')
                                  .upload(filePath, companyLogoFile, {
                                    contentType: companyLogoFile.type || undefined,
                                    upsert: true,
                                  });

                                if (uploadError) throw uploadError;

                                const { data: urlData } = supabase.storage.from('avatars').getPublicUrl(filePath);
                                const logoUrl = urlData.publicUrl;

                                const { error: updateError } = await supabase
                                  .from('profiles')
                                  .update({ company_logo_url: logoUrl })
                                  .eq('id', profile.id);

                                if (updateError) throw updateError;

                                toast({ title: "Logo uploaded", description: "Your company logo has been updated successfully." });
                                setCompanyLogoFile(null);
                                fetchProfile();
                              } catch (error: any) {
                                console.error('Logo upload error:', error);
                                toast({ title: "Upload failed", description: error.message, variant: "destructive" });
                              } finally {
                                setIsUploadingLogo(false);
                              }
                            }}
                          >
                            {isUploadingLogo ? (
                              <>
                                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                Uploading...
                              </>
                            ) : (
                              <>
                                <Upload className="w-4 h-4 mr-2" />
                                Save Logo
                              </>
                            )}
                          </Button>
                        )}
                        <p className="text-xs text-slate-500">PNG, JPG or SVG. Max 2MB recommended.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Information */}
                <div className="pt-6 border-t border-slate-100 space-y-6">
                  <h4 className="font-bold text-slate-900 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Additional Details
                    <Badge variant="outline" className="ml-2">Optional</Badge>
                  </h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Website */}
                    <div className="space-y-2">
                      <Label htmlFor="company-website">Website</Label>
                      <Input
                        id="company-website"
                        type="url"
                        placeholder="https://www.company.com"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* Industry */}
                    <div className="space-y-2">
                      <Label htmlFor="company-industry">Industry</Label>
                      <Input
                        id="company-industry"
                        placeholder="e.g., Technology, Healthcare"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* GST Number */}
                    <div className="space-y-2">
                      <Label htmlFor="company-gst">GST Number</Label>
                      <Input
                        id="company-gst"
                        placeholder="e.g., 22AAAAA0000A1Z5"
                        className="bg-slate-50"
                      />
                    </div>

                    {/* Company Vanity URL */}
                    <div className="space-y-2">
                      <Label>Company Vanity URL</Label>
                      <div className="flex gap-2">
                        <div className="flex-1 flex items-center bg-slate-100 rounded-lg px-3 border border-slate-200">
                          <Globe className="w-4 h-4 text-slate-400 mr-2" />
                          <span className="text-slate-500 text-sm">{window.location.host}/</span>
                          <input
                            className="bg-transparent border-none outline-none text-sm font-medium text-slate-900 flex-1 ml-1"
                            value={companyVanity}
                            onChange={(e) => setCompanyVanity(e.target.value)}
                            placeholder="your-company-name"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-slate-500 italic">This URL will be used to host your corporate ID cards.</p>
                    </div>
                  </div>

                  {/* Company Address */}
                  <div className="space-y-2">
                    <Label htmlFor="company-address">Company Address</Label>
                    <textarea
                      id="company-address"
                      rows={3}
                      placeholder="Enter full company address"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  {/* Company Description */}
                  <div className="space-y-2">
                    <Label htmlFor="company-description">Company Description</Label>
                    <textarea
                      id="company-description"
                      rows={4}
                      placeholder="Brief description of your company and what you do"
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Global Security & Policy */}
                <div className="pt-6 border-t border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-indigo-600" />
                    Global Security & Policy
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Enforce Verification Badge</p>
                        <p className="text-sm text-slate-500">Show "Verified by {profile?.company_name}" on all cards.</p>
                      </div>
                      <Checkbox checked={true} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Auto-Deactivate on Termination</p>
                        <p className="text-sm text-slate-500">Automatically disable card if employee is removed from directory.</p>
                      </div>
                      <Checkbox checked={true} />
                    </div>
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl">
                      <div>
                        <p className="font-medium text-slate-900">Corporate Theme Lock</p>
                        <p className="text-sm text-slate-500">Prevent employees from changing the standard corporate theme.</p>
                      </div>
                      <Checkbox />
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="flex gap-3 pt-4">
                  <Button
                    className="bg-indigo-600 hover:bg-indigo-700 px-8"
                    onClick={async () => {
                      await handleUpdateVanity();
                      toast({ title: "Company details saved successfully" });
                    }}
                  >
                    Save All Changes
                  </Button>
                  <Button variant="outline">Reset to Default</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="parameters">
            <Card className="shadow-md border-none">
              <CardHeader>
                <CardTitle>Onboarding Requirements</CardTitle>
                <CardDescription>Select what data points employees must provide when joining your organization.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AVAILABLE_PARAMETERS.map(param => (
                    <div key={param.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                      <div className="flex items-center gap-3">
                        <Checkbox
                          id={`collect-${param.id}`}
                          checked={selectedParameters.includes(param.id)}
                          onCheckedChange={(checked) => {
                            if (param.required) return;
                            setSelectedParameters(prev =>
                              checked
                                ? [...prev, param.id]
                                : prev.filter(p => p !== param.id)
                            );
                          }}
                          disabled={param.required}
                        />
                        <Label htmlFor={`collect-${param.id}`} className="font-medium cursor-pointer">{param.label}</Label>
                      </div>
                      {param.required && <Badge variant="secondary" className="bg-slate-200 text-slate-600 border-none">Required</Badge>}
                    </div>
                  ))}
                </div>
                <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700 px-8" onClick={async () => {
                  const { error } = await supabase.from('profiles').update({ invite_parameters: selectedParameters }).eq('id', profile!.id);
                  if (!error) toast({ title: "Requirements updated" });
                }}>
                  Save Requirements
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="display">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <Card className="shadow-md border-none h-fit">
                <CardHeader>
                  <CardTitle>Digital ID Card Design</CardTitle>
                  <CardDescription>Choose which pieces of collected data should be visible on the public ID card.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4">
                    {AVAILABLE_PARAMETERS.map(param => (
                      <div key={param.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${selectedParameters.includes(param.id) ? 'bg-slate-50 border-slate-200' : 'bg-slate-50/30 border-dashed border-slate-200 opacity-50'}`}>
                        <div className="flex items-center gap-3">
                          <Checkbox
                            id={`show-${param.id}`}
                            checked={displayParameters.includes(param.id)}
                            disabled={!selectedParameters.includes(param.id)}
                            onCheckedChange={(checked) => {
                              setDisplayParameters(prev =>
                                checked
                                  ? [...prev, param.id]
                                  : prev.filter(p => p !== param.id)
                              );
                            }}
                          />
                          <div className="flex flex-col">
                            <Label htmlFor={`show-${param.id}`} className="font-medium cursor-pointer">{param.label}</Label>
                            {!selectedParameters.includes(param.id) && <span className="text-[10px] text-amber-600 font-bold">Not being collected</span>}
                          </div>
                        </div>
                        <Badge variant="outline" className={`${displayParameters.includes(param.id) ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : 'bg-slate-100 text-slate-400 border-slate-200'}`}>
                          {displayParameters.includes(param.id) ? 'Visible' : 'Hidden'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <Button className="mt-8 bg-indigo-600 hover:bg-indigo-700 w-full" onClick={async () => {
                    const { error } = await supabase.from('profiles').update({ display_parameters: displayParameters }).eq('id', profile!.id);
                    if (!error) toast({ title: "Card design updated" });
                  }}>
                    Update ID Cards
                  </Button>
                </CardContent>
              </Card>

              <div className="flex flex-col items-center gap-6">
                {/* Staff ID Cards Viewer */}
                <Card className="w-full">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Staff ID Card Viewer
                    </CardTitle>
                    <CardDescription>Select an employee to view their ID card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {employees.filter(emp => emp.is_approved).length === 0 ? (
                      <div className="text-center py-12 text-slate-500">
                        <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No approved employees yet</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {/* Employee Selector */}
                        <div className="max-w-md mx-auto">
                          <Label htmlFor="employee-select" className="text-sm font-medium mb-2 block">
                            Select Employee
                          </Label>
                          <select
                            id="employee-select"
                            className="w-full px-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={selectedEmployeeId || ''}
                            onChange={(e) => setSelectedEmployeeId(e.target.value)}
                          >
                            {!selectedEmployeeId && <option value="">-- Choose an employee --</option>}
                            {employees.filter(emp => emp.is_approved).map(employee => {
                              const empProfile = Array.isArray(employee.profiles) ? employee.profiles[0] : employee.profiles;
                              const submittedData = employee.data_submitted as any;
                              const displayName = empProfile?.display_name || submittedData?.display_name || 'Employee';
                              const designation = employee.designation || submittedData?.job_title || 'Team Member';

                              return (
                                <option key={employee.id} value={employee.id}>
                                  {displayName} - {designation}
                                </option>
                              );
                            })}
                          </select>
                        </div>

                        {/* Selected Employee Card */}
                        {(() => {
                          // Auto-select first employee if none selected
                          const approvedEmployees = employees.filter(emp => emp.is_approved);
                          const currentSelectedId = selectedEmployeeId || approvedEmployees[0]?.id;
                          const selectedEmployee = approvedEmployees.find(emp => emp.id === currentSelectedId);

                          if (!selectedEmployee) return null;

                          const empProfile = Array.isArray(selectedEmployee.profiles) ? selectedEmployee.profiles[0] : selectedEmployee.profiles;
                          const submittedData = selectedEmployee.data_submitted as any;

                          return (
                            <div className="flex flex-col items-center gap-4">
                              <div className="bg-slate-50 rounded-[3rem] p-12 border-2 border-slate-200">
                                <CorporateIDCard
                                  user={{
                                    fullName: empProfile?.display_name || submittedData?.display_name || 'Employee',
                                    jobTitle: selectedEmployee.designation || submittedData?.job_title || 'Team Member',
                                    email: submittedData?.email || 'email@company.com',
                                    phone: submittedData?.phone || '',
                                    avatarUrl: empProfile?.avatar_url || submittedData?.avatar_url || '',
                                    vanityUrl: empProfile?.vanity_url || 'employee',
                                    staffId: selectedEmployee.staff_id,
                                    companyVanity: profile?.vanity_url || undefined,
                                    companyName: profile?.company_name
                                  }}
                                  companyLogo={profile?.company_logo_url}
                                  displayParameters={displayParameters}
                                />
                              </div>
                              <div className="text-center space-y-1">
                                <p className="font-bold text-lg text-slate-900">
                                  {empProfile?.display_name || submittedData?.display_name || 'Employee'}
                                </p>
                                <p className="text-sm text-slate-600">
                                  {selectedEmployee.designation || submittedData?.job_title || 'Team Member'}
                                </p>
                                <p className="text-xs text-slate-400 mt-2">
                                  Tap the card to see the reverse side with QR code
                                </p>
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      {/* Manual Add Staff Dialog */}
      <Dialog open={showAddStaffDialog} onOpenChange={(open) => {
        setShowAddStaffDialog(open);
        if (!open) {
          setManualStaffData({});
          setSelectedImage(null);
        }
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <UserPlus className="w-5 h-5 text-indigo-600" />
              Add New Staff Member
            </DialogTitle>
            <DialogDescription>
              Create a new staff profile. Access credentials will be sent to the email provided.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col md:flex-row gap-6 py-4">
            {/* Left Column: Image Upload */}
            <div className="flex-shrink-0 flex flex-col items-center space-y-3">
              <Label className="text-xs font-bold uppercase text-slate-500">Profile Photo</Label>
              <div className="group relative w-32 h-32 bg-slate-100 rounded-[2rem] overflow-hidden border-2 border-dashed border-slate-300 hover:border-indigo-500 transition-colors cursor-pointer">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : manualStaffData.avatar_url ? (
                  <img
                    src={manualStaffData.avatar_url}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-slate-400">
                    <Camera className="w-8 h-8" />
                  </div>
                )}
                <input
                  type="file"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files?.[0]) {
                      setSelectedImage(e.target.files[0]);
                    }
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 bg-black/50 text-white text-[10px] py-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Click to Upload
                </div>
              </div>
              <p className="text-[10px] text-slate-400 text-center max-w-[120px]">
                Recommended: Square image, max 2MB
              </p>
            </div>

            {/* Right Column: Details */}
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manual-name" className="text-xs font-bold uppercase text-slate-500">Full Name *</Label>
                  <Input
                    id="manual-name"
                    placeholder="e.g. John Doe"
                    value={manualStaffData['display_name'] || ''}
                    onChange={(e) => setManualStaffData(prev => ({ ...prev, 'display_name': e.target.value }))}
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-job" className="text-xs font-bold uppercase text-slate-500">Designation</Label>
                  <Input
                    id="manual-job"
                    placeholder="e.g. Product Manager"
                    value={manualStaffData['job_title'] || ''}
                    onChange={(e) => setManualStaffData(prev => ({ ...prev, 'job_title': e.target.value }))}
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-email" className="text-xs font-bold uppercase text-slate-500">Email *</Label>
                  <Input
                    id="manual-email"
                    type="email"
                    placeholder="john@company.com"
                    value={manualStaffData['email'] || ''}
                    onChange={(e) => setManualStaffData(prev => ({ ...prev, 'email': e.target.value }))}
                    className="bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="manual-phone" className="text-xs font-bold uppercase text-slate-500">Phone</Label>
                  <Input
                    id="manual-phone"
                    type="tel"
                    placeholder="+1 234 567 890"
                    value={manualStaffData['phone'] || ''}
                    onChange={(e) => setManualStaffData(prev => ({ ...prev, 'phone': e.target.value }))}
                    className="bg-slate-50"
                  />
                </div>
              </div>

              {/* Additional Parameters */}
              <div className="pt-2">
                <div className="text-xs text-slate-400 mb-2 font-medium">Additional Information</div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {AVAILABLE_PARAMETERS
                    .filter(p => !['display_name', 'email', 'phone', 'avatar_url'].includes(p.id))
                    .map(param => (
                      <div key={param.id} className="space-y-2">
                        <Label htmlFor={`manual-${param.id}`} className="text-xs font-bold uppercase text-slate-500">
                          {param.label} {param.required && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                          id={`manual-${param.id}`}
                          placeholder={`Enter ${param.label.toLowerCase()}`}
                          value={manualStaffData[param.id] || ''}
                          onChange={(e) => setManualStaffData(prev => ({ ...prev, [param.id]: e.target.value }))}
                          className="bg-slate-50"
                        />
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowAddStaffDialog(false)} disabled={isAddingStaff}>Cancel</Button>
            <Button onClick={handleManualAdd} className="bg-indigo-600 hover:bg-indigo-700" disabled={isAddingStaff}>
              {isAddingStaff ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Adding...
                </>
              ) : (
                'Add to Directory'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Import Dialog */}
      <Dialog open={showImportDialog} onOpenChange={setShowImportDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl font-black">
              <FileSpreadsheet className="w-6 h-6 text-emerald-600" />
              Bulk CSV Import
            </DialogTitle>
            <DialogDescription className="text-base">
              Upload a CSV file to add multiple staff members at once. Ensure your column titles match the required format.
            </DialogDescription>
          </DialogHeader>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 space-y-4">
            <div className="flex items-center gap-3 text-amber-800 font-bold">
              <Info className="w-5 h-5" />
              Required Column Titles
            </div>
            <p className="text-sm text-amber-700 leading-relaxed">
              For the most accurate import, please use the exact column titles listed below in the first row of your sheet.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                { title: 'FullName', desc: 'Complete name of the staff member' },
                { title: 'Email', desc: 'Corporate or personal email address' },
                { title: 'Phone', desc: 'Contact number with country code' },
                { title: 'JobTitle', desc: 'Official designation/role in company' },
                { title: 'Address', desc: 'Full office or residential address' },
                { title: 'Bio', desc: 'Short professional biography' }
              ].map(item => (
                <div key={item.title} className="bg-white/50 border border-amber-200/50 rounded-xl p-3 flex items-center justify-between group hover:bg-white transition-all">
                  <div>
                    <code className="text-indigo-700 font-black text-sm">{item.title}</code>
                    <p className="text-[10px] text-amber-600 font-medium">{item.desc}</p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" onClick={() => copyToClipboard(item.title)}>
                    <Copy className="w-3.5 h-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="p-8 border-2 border-dashed border-slate-200 rounded-2xl text-center space-y-4 bg-slate-50/50">
            {isProcessingBulk ? (
              <div className="space-y-4">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-600 mx-auto" />
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Importing Data...</p>
                  <p className="text-xs text-slate-500">Processed {importStatus?.current} of {importStatus?.total} records</p>
                </div>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">
                  <Upload className="w-8 h-8 text-slate-400" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-slate-900">Select CSV File</p>
                  <p className="text-xs text-slate-500">Upload your staff data sheet to begin processing</p>
                </div>
                <Button className="relative overflow-hidden bg-indigo-600 hover:bg-indigo-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Browse Files
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".csv"
                    onChange={handleBulkImport}
                  />
                </Button>
              </>
            )}
          </div>

          <DialogFooter className="sm:justify-between">
            <p className="text-[11px] text-slate-400 italic flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> All data is encrypted and saved to your secure cloud.
            </p>
            <Button variant="ghost" onClick={() => setShowImportDialog(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
