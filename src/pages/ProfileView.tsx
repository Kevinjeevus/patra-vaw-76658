import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Calendar, Star, Share2, MoreVertical, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from '@/hooks/use-toast';

// Mock Data (In real app, fetch based on username)
const MOCK_PROFILE_DATA = {
    id: '1',
    username: 'johndoe',
    displayName: 'John Doe',
    jobTitle: 'Senior Software Engineer',
    company: 'TechCorp Inc.',
    bio: 'Passionate about building scalable web applications and user-centric experiences. Always learning new technologies.',
    avatarUrl: 'https://github.com/shadcn.png',
    location: 'San Francisco, CA',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    website: 'https://johndoe.dev',
    tags: ['Developer', 'React', 'Tech'],
    notes: 'Met at TechConf 2023. Interested in our new API product.',
    savedAt: '2023-10-15T10:30:00Z',
    isFavorite: true,
};

export const ProfileView: React.FC = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(MOCK_PROFILE_DATA);
    const [notes, setNotes] = useState(profile.notes);
    const [isEditingNotes, setIsEditingNotes] = useState(false);

    // Simulate fetching data
    useEffect(() => {
        // In a real app, fetch profile by username here
        console.log("Fetching profile for:", username);
    }, [username]);

    const handleSaveNotes = () => {
        setProfile(prev => ({ ...prev, notes }));
        setIsEditingNotes(false);
        toast({
            title: "Notes Saved",
            description: "Your notes for this profile have been updated.",
        });
    };

    const toggleFavorite = () => {
        setProfile(prev => ({ ...prev, isFavorite: !prev.isFavorite }));
        toast({
            title: profile.isFavorite ? "Removed from Favorites" : "Added to Favorites",
            description: `Profile ${profile.isFavorite ? "removed from" : "added to"} your favorites list.`,
        });
    };

    return (
        <div className="min-h-screen bg-background pb-20">
            {/* Header / Banner */}
            <div className="h-48 bg-gradient-to-r from-blue-600 to-purple-600 relative">
                <div className="absolute top-4 left-4">
                    <Button
                        variant="secondary"
                        size="icon"
                        className="rounded-full bg-white/20 hover:bg-white/40 text-white border-none"
                        onClick={() => navigate(-1)}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 -mt-20 relative">
                <div className="flex flex-col md:flex-row items-start justify-between gap-6 mb-8">
                    <div className="flex flex-col md:flex-row items-center md:items-end gap-6">
                        <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                            <AvatarImage src={profile.avatarUrl} />
                            <AvatarFallback className="text-4xl">{profile.displayName.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="text-center md:text-left mb-2">
                            <h1 className="text-3xl font-bold">{profile.displayName}</h1>
                            <p className="text-lg text-muted-foreground">{profile.jobTitle} @ {profile.company}</p>
                            <div className="flex items-center justify-center md:justify-start gap-2 mt-2 text-sm text-muted-foreground">
                                <MapPin className="w-4 h-4" />
                                <span>{profile.location}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-2 w-full md:w-auto justify-center">
                        <Button
                            variant="outline"
                            size="icon"
                            className={profile.isFavorite ? "text-yellow-500 border-yellow-500/50 bg-yellow-500/10" : ""}
                            onClick={toggleFavorite}
                        >
                            <Star className={`w-5 h-5 ${profile.isFavorite ? "fill-current" : ""}`} />
                        </Button>
                        <Button variant="outline" size="icon">
                            <Share2 className="w-5 h-5" />
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon">
                                    <MoreVertical className="w-5 h-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-destructive">
                                    <Trash2 className="w-4 h-4 mr-2" /> Remove Profile
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Main Info */}
                    <div className="md:col-span-2 space-y-6">
                        <Card>
                            <CardContent className="p-6">
                                <h3 className="font-semibold text-lg mb-4">About</h3>
                                <p className="text-muted-foreground leading-relaxed">
                                    {profile.bio}
                                </p>

                                <div className="flex flex-wrap gap-2 mt-6">
                                    {profile.tags.map(tag => (
                                        <Badge key={tag} variant="secondary">{tag}</Badge>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Tabs defaultValue="notes" className="w-full">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="notes">My Notes</TabsTrigger>
                                <TabsTrigger value="history">History</TabsTrigger>
                            </TabsList>
                            <TabsContent value="notes" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="flex justify-between items-center mb-4">
                                            <h3 className="font-semibold">Private Notes</h3>
                                            {!isEditingNotes ? (
                                                <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(true)}>Edit</Button>
                                            ) : (
                                                <div className="flex gap-2">
                                                    <Button variant="ghost" size="sm" onClick={() => setIsEditingNotes(false)}>Cancel</Button>
                                                    <Button size="sm" onClick={handleSaveNotes}>Save</Button>
                                                </div>
                                            )}
                                        </div>
                                        {isEditingNotes ? (
                                            <Textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="min-h-[150px]"
                                                placeholder="Add private notes about this contact..."
                                            />
                                        ) : (
                                            <p className="text-muted-foreground whitespace-pre-wrap">
                                                {notes || "No notes added yet."}
                                            </p>
                                        )}
                                    </CardContent>
                                </Card>
                            </TabsContent>
                            <TabsContent value="history" className="mt-4">
                                <Card>
                                    <CardContent className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-4 text-sm">
                                                <Calendar className="w-4 h-4 text-muted-foreground" />
                                                <span>Saved on {new Date(profile.savedAt).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm">
                                                <Globe className="w-4 h-4 text-muted-foreground" />
                                                <span>Connected via QR Scan</span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    {/* Contact Info Sidebar */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-lg">Contact Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Mail className="w-4 h-4" />
                                    </div>
                                    <span className="truncate">{profile.email}</span>
                                </a>

                                <a href={`tel:${profile.phone}`} className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Phone className="w-4 h-4" />
                                    </div>
                                    <span>{profile.phone}</span>
                                </a>

                                <a href={profile.website} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm hover:text-primary transition-colors">
                                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                        <Globe className="w-4 h-4" />
                                    </div>
                                    <span className="truncate">{profile.website.replace('https://', '')}</span>
                                </a>
                            </CardContent>
                        </Card>

                        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 text-white border-none">
                            <CardContent className="p-6 text-center">
                                <h3 className="font-bold mb-2">Share Profile</h3>
                                <p className="text-sm text-gray-300 mb-4">Share this contact with others</p>
                                <Button variant="secondary" className="w-full">Share Contact</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};
