import React from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, Trash2, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
    profile: {
        id: string;
        username: string;
        displayName: string;
        jobTitle: string;
        avatarUrl?: string;
        savedAt: string;
        isFavorite?: boolean;
    };
    onRemove?: (id: string) => void;
    onToggleFavorite?: (id: string) => void;
}

export const ProfileCard: React.FC<ProfileCardProps> = ({
    profile,
    onRemove,
    onToggleFavorite
}) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="overflow-hidden border-none shadow-md hover:shadow-xl transition-all duration-300 group relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <Avatar className="w-16 h-16 border-2 border-border shadow-sm">
                            <AvatarImage src={profile.avatarUrl} />
                            <AvatarFallback className="text-lg font-bold bg-primary/10 text-primary">
                                {profile.displayName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>

                        <div className="flex gap-1">
                            <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 ${profile.isFavorite ? 'text-yellow-500' : 'text-muted-foreground hover:text-yellow-500'}`}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleFavorite?.(profile.id);
                                }}
                            >
                                <Star className={`w-4 h-4 ${profile.isFavorite ? 'fill-current' : ''}`} />
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-1 mb-4">
                        <h3 className="font-bold text-lg leading-tight truncate">{profile.displayName}</h3>
                        <p className="text-sm text-muted-foreground truncate">{profile.jobTitle}</p>
                        <p className="text-xs text-primary font-medium">@{profile.username}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                        <span>Saved: {new Date(profile.savedAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            className="flex-1 bg-primary/10 text-primary hover:bg-primary/20 border-none shadow-none"
                            onClick={() => navigate(`/dashboard/profiles/${profile.username}`)}
                        >
                            <Eye className="w-4 h-4 mr-2" /> View
                        </Button>
                        {onRemove && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onRemove(profile.id);
                                }}
                            >
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};
