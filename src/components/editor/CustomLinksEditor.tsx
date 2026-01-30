import React, { useState, useEffect } from 'react';
import { CardData, CustomLink } from './types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Plus, X, Eye, Edit, Trash2, Upload } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User } from '@supabase/supabase-js';

interface CustomLinksEditorProps {
    cardData: CardData;
    setCardData: (data: CardData) => void;
    user: User | null;
}

export const CustomLinksEditor: React.FC<CustomLinksEditorProps> = ({ cardData, setCardData, user }) => {
    const [newCustomLink, setNewCustomLink] = useState<CustomLink>({
        title: '',
        url: '',
        description: '',
        previewImage: '',
        groupId: ''
    });
    const [editingLinkIndex, setEditingLinkIndex] = useState<number | null>(null);
    const [uploadingLinkImage, setUploadingLinkImage] = useState(false);
    const [fetchingLinkPreview, setFetchingLinkPreview] = useState(false);
    const [newGroupName, setNewGroupName] = useState('');

    const handleAddCustomLink = () => {
        if (!newCustomLink.title.trim() || !newCustomLink.url.trim()) {
            toast({
                title: "Error",
                description: "Please provide at least a title and URL",
                variant: "destructive"
            });
            return;
        }

        if (editingLinkIndex !== null) {
            const updated = [...cardData.customLinks];
            updated[editingLinkIndex] = newCustomLink;
            setCardData({ ...cardData, customLinks: updated });
            setEditingLinkIndex(null);
        } else {
            setCardData({ ...cardData, customLinks: [...cardData.customLinks, newCustomLink] });
        }

        setNewCustomLink({ title: '', url: '', description: '', previewImage: '', groupId: '' });
        toast({
            title: "Success!",
            description: editingLinkIndex !== null ? "Link updated" : "Link added",
        });
    };

    const addLinkGroup = () => {
        if (!newGroupName.trim()) return;
        const newGroup = { id: Date.now().toString(), name: newGroupName };
        setCardData({ ...cardData, linkGroups: [...(cardData.linkGroups || []), newGroup] });
        setNewGroupName('');
        toast({ title: "Group created!", description: `"${newGroupName}" added` });
    };

    const deleteLinkGroup = (groupId: string) => {
        setCardData({
            ...cardData,
            linkGroups: (cardData.linkGroups || []).filter(g => g.id !== groupId),
            customLinks: cardData.customLinks.map(link =>
                link.groupId === groupId ? { ...link, groupId: '' } : link
            )
        });
        toast({ title: "Group deleted" });
    };

    const handleEditCustomLink = (index: number) => {
        setNewCustomLink(cardData.customLinks[index]);
        setEditingLinkIndex(index);
    };

    const handleDeleteCustomLink = (index: number) => {
        setCardData({
            ...cardData,
            customLinks: cardData.customLinks.filter((_, i) => i !== index)
        });
        toast({
            title: "Link deleted",
            description: "The custom link has been removed",
        });
    };

    const fetchLinkPreview = async (url: string) => {
        if (!url || !url.startsWith('http')) return;

        setFetchingLinkPreview(true);
        try {
            const response = await fetch(`https://api.microlink.io/?url=${encodeURIComponent(url)}`);
            const data = await response.json();

            if (data.status === 'success' && data.data) {
                setNewCustomLink(prev => ({
                    ...prev,
                    title: prev.title || data.data.title || '',
                    description: prev.description || data.data.description || '',
                    previewImage: prev.previewImage || data.data.image?.url || data.data.logo?.url || ''
                }));

                toast({
                    title: "Preview loaded!",
                    description: "Link preview has been automatically filled",
                });
            }
        } catch (error) {
            console.error('Error fetching link preview:', error);
            toast({
                title: "Could not fetch preview",
                description: "Please add details manually",
                variant: "destructive"
            });
        } finally {
            setFetchingLinkPreview(false);
        }
    };

    useEffect(() => {
        const debounce = setTimeout(() => {
            if (newCustomLink.url && newCustomLink.url.startsWith('http') && !newCustomLink.title && editingLinkIndex === null) {
                fetchLinkPreview(newCustomLink.url);
            }
        }, 1500);

        return () => clearTimeout(debounce);
    }, [newCustomLink.url, newCustomLink.title, editingLinkIndex]);

    const handleLinkImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file || !user) return;

        setUploadingLinkImage(true);
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/link-previews/${Math.random()}.${fileExt}`;

            const { error: uploadError } = await supabase.storage
                .from('avatars')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(fileName);

            setNewCustomLink({ ...newCustomLink, previewImage: publicUrl });

            toast({
                title: "Image uploaded!",
                description: "Preview image has been added.",
            });
        } catch (error: any) {
            console.error('Error uploading image:', error);
            toast({
                title: "Upload failed",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setUploadingLinkImage(false);
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-bold mb-2">Custom Links</h2>
                <p className="text-muted-foreground text-sm mb-6">
                    Add custom links and organize them into groups
                </p>
            </div>

            {/* Link Groups Management */}
            <div className="space-y-3 p-4 border rounded-lg">
                <h3 className="font-semibold text-sm">Link Groups</h3>
                <div className="flex gap-2">
                    <Input
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                        placeholder="e.g., Social Media, Products"
                        onKeyPress={(e) => e.key === 'Enter' && addLinkGroup()}
                    />
                    <Button onClick={addLinkGroup} size="icon" variant="outline">
                        <Plus className="w-4 h-4" />
                    </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                    {(cardData.linkGroups || []).map(group => (
                        <Badge key={group.id} variant="secondary" className="gap-1">
                            {group.name}
                            <X
                                className="w-3 h-3 cursor-pointer hover:text-destructive"
                                onClick={() => deleteLinkGroup(group.id)}
                            />
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Add/Edit Link Form */}
            <div className="space-y-4 p-4 border border-border rounded-lg bg-muted/30">
                <div>
                    <Label htmlFor="link-group">Assign to Group (Optional)</Label>
                    <select
                        id="link-group"
                        value={newCustomLink.groupId || ''}
                        onChange={(e) => setNewCustomLink({ ...newCustomLink, groupId: e.target.value })}
                        className="w-full p-2 border rounded-md bg-background"
                    >
                        <option value="">No Group</option>
                        {(cardData.linkGroups || []).map(group => (
                            <option key={group.id} value={group.id}>{group.name}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <Label htmlFor="link-url">URL *</Label>
                    <div className="relative">
                        <Input
                            id="link-url"
                            type="url"
                            value={newCustomLink.url}
                            onChange={(e) => setNewCustomLink({ ...newCustomLink, url: e.target.value })}
                            placeholder="https://example.com"
                            className="pr-10"
                        />
                        {fetchingLinkPreview && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2">
                                <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            </div>
                        )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                        {fetchingLinkPreview
                            ? "Fetching preview..."
                            : "Paste a URL and we'll automatically fetch the preview"
                        }
                    </p>
                    {newCustomLink.url && !fetchingLinkPreview && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fetchLinkPreview(newCustomLink.url)}
                            className="mt-2"
                            type="button"
                        >
                            <Eye className="w-3 h-3 mr-1" />
                            Refresh Preview
                        </Button>
                    )}
                </div>

                <div>
                    <Label htmlFor="link-title">Link Title *</Label>
                    <Input
                        id="link-title"
                        value={newCustomLink.title}
                        onChange={(e) => setNewCustomLink({ ...newCustomLink, title: e.target.value })}
                        placeholder="e.g., My Portfolio"
                    />
                </div>

                <div>
                    <Label htmlFor="link-description">Description (Optional)</Label>
                    <Textarea
                        id="link-description"
                        value={newCustomLink.description}
                        onChange={(e) => setNewCustomLink({ ...newCustomLink, description: e.target.value })}
                        placeholder="A brief description about this link"
                        className="min-h-[80px]"
                    />
                </div>

                <div className="space-y-2">
                    <Label>Preview Image</Label>
                    <div className="flex gap-2">
                        <Input
                            value={newCustomLink.previewImage}
                            onChange={(e) => setNewCustomLink({ ...newCustomLink, previewImage: e.target.value })}
                            placeholder="Image URL or upload below"
                        />
                        <Label htmlFor="link-image-upload" className="cursor-pointer">
                            <Button variant="outline" disabled={uploadingLinkImage} asChild type="button">
                                <span>
                                    <Upload className="w-4 h-4 mr-2" />
                                    {uploadingLinkImage ? 'Uploading...' : 'Upload'}
                                </span>
                            </Button>
                        </Label>
                        <Input
                            id="link-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLinkImageUpload}
                        />
                    </div>
                    {newCustomLink.previewImage && (
                        <div className="relative inline-block mt-2">
                            <img
                                src={newCustomLink.previewImage}
                                alt="Preview"
                                className="w-full max-w-[200px] h-auto object-cover rounded-md border border-border"
                            />
                            <Button
                                type="button"
                                size="icon"
                                variant="destructive"
                                className="absolute top-1 right-1 h-6 w-6"
                                onClick={() => setNewCustomLink({ ...newCustomLink, previewImage: '' })}
                            >
                                <X className="w-3 h-3" />
                            </Button>
                        </div>
                    )}
                </div>

                <Button onClick={handleAddCustomLink} className="w-full" type="button">
                    <Plus className="w-4 h-4 mr-2" />
                    {editingLinkIndex !== null ? 'Update Link' : 'Add Link'}
                </Button>

                {editingLinkIndex !== null && (
                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => {
                            setEditingLinkIndex(null);
                            setNewCustomLink({ title: '', url: '', description: '', previewImage: '', groupId: '' });
                        }}
                        className="w-full"
                    >
                        Cancel Edit
                    </Button>
                )}
            </div>

            {/* Existing Links List */}
            {cardData.customLinks.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-sm">Your Custom Links</h3>
                    {cardData.customLinks.map((link, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg bg-card hover:bg-muted/50 transition-colors">
                            {link.previewImage && (
                                <img
                                    src={link.previewImage}
                                    alt={link.title}
                                    className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm truncate">{link.title}</h4>
                                <p className="text-xs text-muted-foreground truncate">{link.url}</p>
                                {link.description && (
                                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{link.description}</p>
                                )}
                            </div>
                            <div className="flex gap-1 flex-shrink-0">
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleEditCustomLink(index)}
                                    className="h-8 w-8"
                                    type="button"
                                >
                                    <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="ghost"
                                    onClick={() => handleDeleteCustomLink(index)}
                                    className="h-8 w-8 text-destructive hover:text-destructive"
                                    type="button"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
