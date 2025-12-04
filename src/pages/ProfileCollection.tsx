import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, ArrowLeft, FolderPlus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ProfileCard } from '@/components/profile/ProfileCard';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Mock Data
const MOCK_PROFILES = [
    {
        id: '1',
        username: 'johndoe',
        displayName: 'John Doe',
        jobTitle: 'Senior Software Engineer',
        avatarUrl: 'https://github.com/shadcn.png',
        savedAt: '2023-10-15T10:30:00Z',
        isFavorite: true,
    },
    {
        id: '2',
        username: 'janestudio',
        displayName: 'Jane Smith',
        jobTitle: 'Creative Director',
        avatarUrl: null,
        savedAt: '2023-10-18T14:20:00Z',
        isFavorite: false,
    },
    {
        id: '3',
        username: 'mike_tech',
        displayName: 'Mike Johnson',
        jobTitle: 'CTO @ TechCorp',
        avatarUrl: null,
        savedAt: '2023-11-01T09:15:00Z',
        isFavorite: false,
    },
    {
        id: '4',
        username: 'sarah_design',
        displayName: 'Sarah Wilson',
        jobTitle: 'Product Designer',
        avatarUrl: null,
        savedAt: '2023-11-05T16:45:00Z',
        isFavorite: true,
    },
];

export const ProfileCollection: React.FC = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<'all' | 'favorites'>('all');
    const [profiles, setProfiles] = useState(MOCK_PROFILES);

    const filteredProfiles = profiles.filter(profile => {
        const matchesSearch =
            profile.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
            profile.jobTitle.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesFilter = filter === 'all' || (filter === 'favorites' && profile.isFavorite);

        return matchesSearch && matchesFilter;
    });

    const handleToggleFavorite = (id: string) => {
        setProfiles(prev => prev.map(p =>
            p.id === id ? { ...p, isFavorite: !p.isFavorite } : p
        ));
    };

    const handleRemove = (id: string) => {
        setProfiles(prev => prev.filter(p => p.id !== id));
    };

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="max-w-7xl mx-auto space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/dashboard')}>
                            <ArrowLeft className="w-5 h-5" />
                        </Button>
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">Saved Profiles</h1>
                            <p className="text-muted-foreground mt-1">
                                Manage your network and connections ({profiles.length})
                            </p>
                        </div>
                    </div>

                    <Button className="gap-2">
                        <FolderPlus className="w-4 h-4" /> New Folder
                    </Button>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                            placeholder="Search by name, username, or job title..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 min-w-[120px]">
                                <Filter className="w-4 h-4" />
                                {filter === 'all' ? 'All Profiles' : 'Favorites'}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => setFilter('all')}>
                                All Profiles
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setFilter('favorites')}>
                                Favorites Only
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                {/* Grid */}
                {filteredProfiles.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">No profiles found</h3>
                        <p className="text-muted-foreground">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredProfiles.map((profile) => (
                            <ProfileCard
                                key={profile.id}
                                profile={profile}
                                onToggleFavorite={handleToggleFavorite}
                                onRemove={handleRemove}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
