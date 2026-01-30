import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import { Auth } from "./pages/Auth";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { DashboardRouter } from "./pages/DashboardRouter";
import { OnboardingNew } from "./pages/OnboardingNew";
import { Analytics } from "./pages/Analytics";
import { EditorNew } from "./pages/EditorNew";
import { CardEditorNew } from "./pages/CardEditorNew";
import { CardTemplates } from "./pages/CardTemplates";
import { PublicProfile } from "./pages/PublicProfile";
import { MyCard } from "./pages/mycard";
import { YourselfAI } from "./pages/YourselfAI";
import { EmailSignature } from "./pages/EmailSignature";
import { ApiDocs } from "./pages/ApiDocs";
import { DeveloperPortal } from "./pages/DeveloperPortal";
import { Settings } from "./pages/Settings";
import { Docs } from "./pages/Docs";
import NotFound from "./pages/NotFound";
import AIChat from "./pages/AIChat";
import { Templates } from "./pages/Templates";
import Admin from "./pages/Admin";
import { Feedback } from "./pages/Feedback";
import { ProfileCollection } from "./pages/ProfileCollection";
import { ProfileView } from "./pages/ProfileView";
import { AccessManagement } from "./pages/AccessManagement";
import { EmbedCard } from "./pages/EmbedCard";
import Pricing from "./pages/Pricing";
// import PrintCard from "./pages/Printcard";
import { InvitePage } from "./pages/InvitePage";
import { CorporateEditor } from "./pages/CorporateEditor";
import { StaffCardView } from "./pages/StaffCardView";
import { AlertCircle, Clock, Shield } from "lucide-react";
import { Button as UIButton } from "@/components/ui/button";


const queryClient = new QueryClient();

// Landing page wrapper to redirect logged-in users
const LandingPageWrapper = () => {
  const { user, loading } = useAuth();
  const [accountType, setAccountType] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      const fetchType = async () => {
        const { data } = await supabase.from('profiles').select('account_type').eq('user_id', user.id).single();
        if (data) setAccountType(data.account_type);
      };
      fetchType();
    }
  }, [user]);

  if (loading) return null;
  if (user) {
    if (accountType === 'company') return <Navigate to="/dashboard" replace />;
    if (accountType === 'individual') return <Navigate to="/editor" replace />;
    // If accountType is not yet loaded, wait
    if (!accountType) return null;
  }
  return <Index />;
};

const AppContent = () => {
  const { user } = useAuth();
  const [maintenanceSettings, setMaintenanceSettings] = useState<{ enabled: boolean, until: string | null } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        // Check maintenance mode
        const { data: settings } = await supabase
          .from('system_settings')
          .select('value')
          .eq('key', 'global_settings')
          .maybeSingle();

        if (settings?.value) {
          const val = settings.value as any;
          setMaintenanceSettings({
            enabled: val.maintenanceMode || false,
            until: val.maintenanceUntil || null
          });
        }

        // Check if current user is admin
        if (user) {
          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .eq('role', 'admin')
            .maybeSingle();

          if (roleData) setIsAdmin(true);
        }
      } catch (err) {
        console.error("Error checking system status:", err);
      } finally {
        setLoading(false);
      }
    };

    checkStatus();

    // Subscribe to settings changes
    const channel = supabase
      .channel('system_settings_changes')
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'system_settings' }, (payload) => {
        if (payload.new && (payload.new as any).key === 'global_settings') {
          const val = (payload.new as any).value;
          setMaintenanceSettings({
            enabled: val.maintenanceMode || false,
            until: val.maintenanceUntil || null
          });
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (loading) return null;

  // Show maintenance screen if enabled and user is not an admin
  if (maintenanceSettings?.enabled && !isAdmin) {
    const finishTime = maintenanceSettings.until ? new Date(maintenanceSettings.until) : null;
    const isPast = finishTime && finishTime < new Date();

    if (!isPast) {
      return (
        <div className="fixed inset-0 z-[9999] bg-background flex items-center justify-center p-6 text-center">
          <div className="max-w-md space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Clock className="w-10 h-10 text-primary animate-pulse" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">Under Maintenance</h1>
            <p className="text-xl text-muted-foreground">
              We are under maintenance please try again after some time.
            </p>

            {finishTime && (
              <div className="p-4 bg-muted rounded-xl space-y-2">
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Estimated Completion</p>
                <p className="text-2xl font-bold">
                  {finishTime.toLocaleString(undefined, {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                    day: '2-digit',
                    month: 'short'
                  })}
                </p>
                <div className="text-xs text-muted-foreground">
                  {Math.max(0, Math.ceil((finishTime.getTime() - new Date().getTime()) / (1000 * 60 * 60)))} hours remaining
                </div>
              </div>
            )}

            <div className="pt-8">
              <UIButton variant="ghost" onClick={() => window.location.reload()} className="gap-2">
                Check Again
              </UIButton>
            </div>

            <p className="text-xs text-muted-foreground pt-12">
              &copy; {new Date().getFullYear()} Patra Digital Identity Platform.
            </p>
          </div>
        </div>
      );
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPageWrapper />} />
        <Route path="/yourself-ai" element={<YourselfAI />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="/onboarding"
          element={
            <ProtectedRoute>
              <OnboardingNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard/:tab?"
          element={
            <ProtectedRoute>
              <DashboardRouter />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/editor"
          element={
            <ProtectedRoute>
              <EditorNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/corporate-editor"
          element={
            <ProtectedRoute>
              <CorporateEditor />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card-editor"
          element={
            <ProtectedRoute>
              <CardEditorNew />
            </ProtectedRoute>
          }
        />
        <Route
          path="/card-templates"
          element={
            <ProtectedRoute>
              <CardTemplates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/email-signature"
          element={
            <ProtectedRoute>
              <EmailSignature />
            </ProtectedRoute>
          }
        />
        <Route path="/api-docs" element={<ApiDocs />} />
        <Route
          path="/developer"
          element={
            <ProtectedRoute>
              <DeveloperPortal />
            </ProtectedRoute>
          }
        />
        <Route path="/docs" element={<Docs />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings/:type"
          element={
            <ProtectedRoute>
              <Feedback />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/templates"
          element={
            <ProtectedRoute>
              <Templates />
            </ProtectedRoute>
          }
        />

        {/* <Route
          path="/printcard"
          element={
            <ProtectedRoute>
              <PrintCard />
            </ProtectedRoute>
          }
        /> */}

        <Route
          path="/dashboard/access"
          element={
            <ProtectedRoute>
              <AccessManagement />
            </ProtectedRoute>
          }
        />

        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="/invite" element={<InvitePage />} />
        <Route path="/embed/:username" element={<EmbedCard />} />

        <Route path="/:username/ai" element={<AIChat />} />
        <Route path="/:companyVanity/:staffId" element={<StaffCardView />} />
        <Route path="/:username" element={<PublicProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AppContent />
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
