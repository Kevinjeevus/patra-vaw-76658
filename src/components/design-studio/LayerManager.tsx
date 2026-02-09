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
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragEndEvent,
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
    useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface LayerManagerProps {
    elements: CanvasElement[];
    selectedElementId: string | null;
    onSelectElement: (id: string) => void;
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
    onReorder: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
    onMoveLayer: (activeId: string, overId: string) => void;
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

interface SortableLayerItemProps {
    element: CanvasElement;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
}

const SortableLayerItem: React.FC<SortableLayerItemProps> = ({
    element,
    isSelected,
    onSelect,
    onUpdateElement,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: element.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 50 : undefined,
        opacity: isDragging ? 0.5 : 1,
    };

    const Icon = IconMap[element.type] || Type;

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={cn(
                "group flex items-center gap-2 p-2 rounded-md transition-colors cursor-pointer",
                isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent",
                isDragging && "shadow-lg bg-background border-primary"
            )}
            onClick={() => onSelect(element.id)}
        >
            <div
                className="text-muted-foreground cursor-grab active:cursor-grabbing"
                {...attributes}
                {...listeners}
            >
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
};

export const LayerManager: React.FC<LayerManagerProps> = ({
    elements,
    selectedElementId,
    onSelectElement,
    onUpdateElement,
    onReorder,
    onMoveLayer,
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    // Sort elements by zIndex descending (top layers first in list)
    // For SortableContext we need the IDs in the correct order
    const sortedElements = [...elements].sort((a, b) => b.zIndex - a.zIndex);
    const elementIds = sortedElements.map(el => el.id);

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (over && active.id !== over.id) {
            onMoveLayer(active.id as string, over.id as string);
        }
    };

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
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext
                                items={elementIds}
                                strategy={verticalListSortingStrategy}
                            >
                                {sortedElements.map((element) => (
                                    <SortableLayerItem
                                        key={element.id}
                                        element={element}
                                        isSelected={selectedElementId === element.id}
                                        onSelect={onSelectElement}
                                        onUpdateElement={onUpdateElement}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
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
