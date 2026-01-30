import React, { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Loader2, Bell, ShieldAlert, UserMinus, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from 'react-router-dom';

interface LogEntry {
    id: string;
    actor_id: string;
    target_id: string;
    action_type: 'saved_profile' | 'removed_access' | 'revoked_access';
    created_at: string;
    actor: {
        display_name: string;
        avatar_url: string;
    };
    target: {
        display_name: string;
        avatar_url: string;
    };
}

export const LogViewer: React.FC = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && user) {
            fetchLogs();
        }
    }, [isOpen, user]);

    const fetchLogs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('access_logs')
                .select(`
          *,
          actor:actor_id(display_name, avatar_url),
          target:target_id(display_name, avatar_url)
        `)
                .or(`actor_id.eq.${user?.id},target_id.eq.${user?.id}`)
                .order('created_at', { ascending: false });

            if (error) throw error;
            // @ts-ignore
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching logs:', error);
        } finally {
            setLoading(false);
        }
    };

    const getLogMessage = (log: LogEntry) => {
        const isActor = user?.id === log.actor_id;
        const otherPerson = isActor ? log.target : log.actor;
        const otherName = otherPerson?.display_name || 'Unknown User';
        const date = format(new Date(log.created_at), 'MM/dd/yyyy');

        switch (log.action_type) {
            case 'saved_profile':
                if (isActor) {
                    return (
                        <span>
                            You saved <strong>{otherName}'s</strong> profile on {date}. Tap to see the profile.
                        </span>
                    );
                } else {
                    return (
                        <span>
                            <strong>{otherName}</strong> saved your profile on {date}. Tap to see profile.
                        </span>
                    );
                }
            case 'removed_access':
                if (isActor) {
                    return (
                        <span>
                            You removed <strong>{otherName}</strong> from accessing your profile. If you made a mistake, add their profile again.
                        </span>
                    );
                } else {
                    return (
                        <span>
                            <strong>{otherName}</strong> removed you from their connections.
                        </span>
                    );
                }
            case 'revoked_access':
                if (isActor) {
                    return (
                        <span>
                            You revoked <strong>{otherName}'s</strong> access to your profile.
                        </span>
                    );
                } else {
                    return (
                        <span>
                            <strong>{otherName}</strong> revoked his profile which removed your permission from accessing his profile. He can't access your profile too.
                        </span>
                    );
                }
            default:
                return <span>Action performed involving {otherName}</span>;
        }
    };

    const getIcon = (actionType: string) => {
        switch (actionType) {
            case 'saved_profile': return <UserPlus className="h-4 w-4 text-green-500" />;
            case 'removed_access': return <UserMinus className="h-4 w-4 text-red-500" />;
            case 'revoked_access': return <ShieldAlert className="h-4 w-4 text-orange-500" />;
            default: return <Bell className="h-4 w-4" />;
        }
    };

    return (
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-muted">
                    <Bell className="h-5 w-5" />
                </Button>
            </SheetTrigger>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>Access Logs</SheetTitle>
                    <SheetDescription>
                        History of profile access and connection changes.
                    </SheetDescription>
                </SheetHeader>
                <ScrollArea className="h-[calc(100vh-100px)] mt-4 pr-4">
                    {loading ? (
                        <div className="flex justify-center py-4">
                            <Loader2 className="h-6 w-6 animate-spin" />
                        </div>
                    ) : logs.length === 0 ? (
                        <p className="text-center text-muted-foreground py-4">No logs found.</p>
                    ) : (
                        <div className="space-y-4">
                            {logs.map((log) => {
                                const isActor = user?.id === log.actor_id;
                                const otherPerson = isActor ? log.target : log.actor;

                                return (
                                    <div key={log.id} className="flex gap-3 items-start p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer" onClick={async () => {
                                        const isActor = user?.id === log.actor_id;
                                        const otherPersonId = isActor ? log.target_id : log.actor_id;
                                        
                                        try {
                                            const { data } = await supabase
                                                .from('digital_cards')
                                                .select('vanity_url')
                                                .eq('owner_user_id', otherPersonId)
                                                .eq('is_active', true)
                                                .limit(1)
                                                .maybeSingle();
                                                
                                            if (data?.vanity_url) {
                                                navigate(`/${data.vanity_url}`);
                                            } else {
                                                navigate('/dashboard/access');
                                            }
                                        } catch (e) {
                                            navigate('/dashboard/access');
                                        }
                                    }}>
                                        <Avatar className="h-10 w-10 border">
                                            <AvatarImage src={otherPerson?.avatar_url} />
                                            <AvatarFallback>{otherPerson?.display_name?.substring(0, 2).toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className="space-y-1 flex-1">
                                            <div className="flex items-center gap-2 text-sm font-medium">
                                                {getIcon(log.action_type)}
                                                <span className="text-xs text-muted-foreground">{format(new Date(log.created_at), 'MMM d, yyyy h:mm a')}</span>
                                            </div>
                                            <p className="text-sm text-foreground leading-snug">
                                                {getLogMessage(log)}
                                            </p>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </ScrollArea>
            </SheetContent>
        </Sheet>
    );
};
