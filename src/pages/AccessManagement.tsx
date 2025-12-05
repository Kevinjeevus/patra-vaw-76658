import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Shield,
    Users,
    UserMinus,
    Search,
    ArrowLeft,
    Clock,
    CheckCircle2,
    AlertCircle,
    Filter
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from '@/hooks/use-toast';

// Mock Data for "Shared With" (People who have your card)
const MOCK_SHARED_WITH = [
    {
        id: '1',
        name: 'Alice Freeman',
        role: 'Marketing Director',
        company: 'Growth Co.',
        avatar: 'https://i.pravatar.cc/150?u=alice',
        connectedAt: '2023-11-10T14:30:00Z',
        status: 'active',
        accessLevel: 'full'
    },
    {
        id: '2',
        name: 'Bob Smith',
        role: 'Freelance Designer',
        company: 'Self Employed',
        avatar: 'https://i.pravatar.cc/150?u=bob',
        connectedAt: '2023-11-12T09:15:00Z',
        status: 'active',
        accessLevel: 'limited'
    },
    {
        id: '3',
        name: 'Charlie Davis',
        role: 'Recruiter',
        company: 'Tech Talent',
        avatar: 'https://i.pravatar.cc/150?u=charlie',
        connectedAt: '2023-10-05T16:45:00Z',
        status: 'revoked',
        accessLevel: 'none'
    }
];

// Mock Data for "My Connections" (People whose cards I have)
const MOCK_MY_CONNECTIONS = [
    {
        id: '101',
        name: 'David Wilson',
        role: 'CTO',
        company: 'Innovate Inc.',
        avatar: 'https://i.pravatar.cc/150?u=david',
        savedAt: '2023-11-15T10:00:00Z',
        notes: 'Met at Tech Summit'
    },
    {
        id: '102',
        name: 'Eva Green',
        role: 'Product Manager',
        company: 'Creative Solutions',
        avatar: 'https://i.pravatar.cc/150?u=eva',
        savedAt: '2023-11-18T11:20:00Z',
        notes: ''
    }
];

export const AccessManagement: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('shared-with');
    const [sharedWith, setSharedWith] = useState(MOCK_SHARED_WITH);
    const [myConnections, setMyConnections] = useState(MOCK_MY_CONNECTIONS);
    const [userToRevoke, setUserToRevoke] = useState<string | null>(null);

    const handleRevokeAccess = (userId: string) => {
        // In a real app, API call to revoke access
        setSharedWith(prev => prev.map(user =>
            user.id === userId ? { ...user, status: 'revoked', accessLevel: 'none' } : user
        ));

        toast({
            title: "Access Revoked",
            description: "This user can no longer view your updated details.",
            variant: "destructive"
        });
        setUserToRevoke(null);
    };

    const handleRemoveConnection = (connectionId: string) => {
        // In a real app, API call to remove saved profile
        setMyConnections(prev => prev.filter(c => c.id !== connectionId));
        toast({
            title: "Connection Removed",
            description: "Profile removed from your saved collection.",
        });
    };

    const filteredSharedWith = sharedWith.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredConnections = myConnections.filter(conn =>
        conn.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conn.company.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Header */}
            <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto px-4 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')} className="rounded-full hover:bg-muted">
                                <ArrowLeft className="w-5 h-5" />
                            </Button>
                            <div>
                                <h1 className="text-2xl font-bold flex items-center gap-2">
                                    <Shield className="w-6 h-6 text-primary" />
                                    Access Management
                                </h1>
                                <p className="text-sm text-muted-foreground hidden md:block">
                                    Control who can view your digital card details
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <Tabs defaultValue="shared-with" value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                        <TabsList className="grid w-full md:w-auto grid-cols-2">
                            <TabsTrigger value="shared-with" className="gap-2">
                                <Users className="w-4 h-4" /> Shared With Me
                            </TabsTrigger>
                            <TabsTrigger value="my-connections" className="gap-2">
                                <CheckCircle2 className="w-4 h-4" /> My Connections
                            </TabsTrigger>
                        </TabsList>

                        <div className="relative w-full md:w-72">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search people or companies..."
                                className="pl-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Tab: Shared With (People who have my card) */}
                    <TabsContent value="shared-with" className="space-y-4">
                        <div className="grid gap-4">
                            {filteredSharedWith.length === 0 ? (
                                <div className="text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                                    <Users className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                                    <h3 className="text-lg font-medium">No active shares found</h3>
                                    <p className="text-muted-foreground">People who scan your QR code will appear here.</p>
                                </div>
                            ) : (
                                filteredSharedWith.map((user) => (
                                    <motion.div
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        layout
                                    >
                                        <Card className={`border-l-4 ${user.status === 'active' ? 'border-l-green-500' : 'border-l-gray-300'} shadow-sm hover:shadow-md transition-shadow`}>
                                            <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                                                <div className="flex items-center gap-4 w-full md:w-auto">
                                                    <Avatar className="w-12 h-12 border">
                                                        <AvatarImage src={user.avatar} />
                                                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <div className="flex items-center gap-2">
                                                            <h3 className="font-bold text-lg">{user.name}</h3>
                                                            {user.status === 'active' ? (
                                                                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100 text-xs">Active</Badge>
                                                            ) : (
                                                                <Badge variant="secondary" className="bg-gray-100 text-gray-500 hover:bg-gray-100 text-xs">Revoked</Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-muted-foreground">{user.role} at {user.company}</p>
                                                        <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                                            <Clock className="w-3 h-3" />
                                                            <span>Connected {new Date(user.connectedAt).toLocaleDateString()}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-2 w-full md:w-auto justify-end">
                                                    {user.status === 'active' ? (
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="outline" className="text-destructive border-destructive/20 hover:bg-destructive/10 hover:text-destructive gap-2 w-full md:w-auto">
                                                                    <UserMinus className="w-4 h-4" /> Revoke Access
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>Revoke access for {user.name}?</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        They will no longer receive updates to your digital card. They may still have a cached version of your contact info.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                    <AlertDialogAction
                                                                        onClick={() => handleRevokeAccess(user.id)}
                                                                        className="bg-destructive hover:bg-destructive/90"
                                                                    >
                                                                        Yes, Revoke Access
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    ) : (
                                                        <Button variant="ghost" disabled className="gap-2 w-full md:w-auto opacity-50">
                                                            <UserMinus className="w-4 h-4" /> Access Revoked
                                                        </Button>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </TabsContent>

                    {/* Tab: My Connections (People whose cards I have) */}
                    <TabsContent value="my-connections" className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {filteredConnections.length === 0 ? (
                                <div className="col-span-full text-center py-12 bg-muted/30 rounded-xl border border-dashed">
                                    <Search className="w-12 h-12 mx-auto text-muted-foreground mb-3 opacity-50" />
                                    <h3 className="text-lg font-medium">No connections found</h3>
                                    <p className="text-muted-foreground">Profiles you save will appear here.</p>
                                </div>
                            ) : (
                                filteredConnections.map((conn) => (
                                    <motion.div
                                        key={conn.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                    >
                                        <Card className="h-full hover:border-primary/50 transition-colors">
                                            <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2">
                                                <Avatar className="w-10 h-10">
                                                    <AvatarImage src={conn.avatar} />
                                                    <AvatarFallback>{conn.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 overflow-hidden">
                                                    <CardTitle className="text-base truncate">{conn.name}</CardTitle>
                                                    <CardDescription className="truncate">{conn.role} @ {conn.company}</CardDescription>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="text-xs text-muted-foreground mb-4">
                                                    Saved on {new Date(conn.savedAt).toLocaleDateString()}
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="secondary" size="sm" className="flex-1" onClick={() => navigate('/dashboard/profiles')}>
                                                        View Profile
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                                                                Remove
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>Remove {conn.name}?</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This will remove them from your saved profiles. You can scan their QR code again to reconnect.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => handleRemoveConnection(conn.id)}>
                                                                    Remove
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                ))
                            )}
                        </div>
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};
