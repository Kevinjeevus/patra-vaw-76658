import React from 'react';
import { CanvasElement, ElementType, ELEMENT_ICONS } from '@/types/design-studio';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Eye, EyeOff, Lock, Unlock, GripVertical,
    ChevronUp, ChevronDown, ArrowUpToLine, ArrowDownToLine,
    Type, User, Building2, Briefcase, Hash, Users, Mail, Phone, QrCode, Square, Minus
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LayerManagerProps {
    elements: CanvasElement[];
    selectedElementId: string | null;
    onSelectElement: (id: string) => void;
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
    onReorder: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
}

const IconMap: Record<ElementType, any> = {
    company_logo: Building2,
    profile_photo: User,
    name: Type,
    designation: Briefcase,
    employee_id: Hash,
    department: Users,
    email: Mail,
    phone: Phone,
    qr_code: QrCode,
    custom_text: Type,
    shape: Square,
    divider: Minus,
};

export const LayerManager: React.FC<LayerManagerProps> = ({
    elements,
    selectedElementId,
    onSelectElement,
    onUpdateElement,
    onReorder,
}) => {
    // Sort elements by zIndex descending (top layers first in list)
    const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);

    return (
        <div className="flex flex-col h-full bg-card">
            <div className="p-4 border-b">
                <h3 className="text-sm font-semibold">Layers</h3>
                <p className="text-xs text-muted-foreground mt-1">
                    Manage and reorder card elements
                </p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-2 space-y-1">
                    {sortedElements.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground text-xs italic">
                            No elements added yet
                        </div>
                    ) : (
                        sortedElements.map((element) => {
                            const Icon = IconMap[element.type] || Type;
                            const isSelected = selectedElementId === element.id;

                            return (
                                <div
                                    key={element.id}
                                    className={cn(
                                        "group flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer",
                                        isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent"
                                    )}
                                    onClick={() => onSelectElement(element.id)}
                                >
                                    <div className="text-muted-foreground">
                                        <GripVertical className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>

                                    <div className={cn(
                                        "p-1.5 rounded bg-muted flex items-center justify-center",
                                        isSelected && "bg-primary/20 text-primary"
                                    )}>
                                        <Icon className="w-3.5 h-3.5" />
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-medium truncate">
                                            {element.label}
                                        </div>
                                        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                            Z-Index: {element.zIndex}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onUpdateElement(element.id, { visible: !element.visible });
                                            }}
                                            title={element.visible !== false ? 'Hide' : 'Show'}
                                        >
                                            {element.visible !== false ? (
                                                <Eye className="w-3 h-3 text-muted-foreground" />
                                            ) : (
                                                <EyeOff className="w-3 h-3 text-destructive" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-6 w-6"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                onUpdateElement(element.id, { locked: !element.locked });
                                            }}
                                            title={element.locked ? 'Unlock' : 'Lock'}
                                        >
                                            {element.locked ? (
                                                <Lock className="w-3 h-3 text-amber-500" />
                                            ) : (
                                                <Unlock className="w-3 h-3 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </ScrollArea>

            {selectedElementId && (
                <div className="p-3 border-t bg-muted/30 grid grid-cols-4 gap-1">
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-full"
                        onClick={() => onReorder(selectedElementId, 'back')}
                        title="Send to Back"
                    >
                        <ArrowDownToLine className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-full"
                        onClick={() => onReorder(selectedElementId, 'backward')}
                        title="Send Backward"
                    >
                        <ChevronDown className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-full"
                        onClick={() => onReorder(selectedElementId, 'forward')}
                        title="Bring Forward"
                    >
                        <ChevronUp className="w-3.5 h-3.5" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-full"
                        onClick={() => onReorder(selectedElementId, 'front')}
                        title="Bring to Front"
                    >
                        <ArrowUpToLine className="w-3.5 h-3.5" />
                    </Button>
                </div>
            )}
        </div>
    );
};
