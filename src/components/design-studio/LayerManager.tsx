import React from 'react';
import { CanvasElement, ElementType, ELEMENT_ICONS } from '@/types/design-studio';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Eye, EyeOff, Lock, Unlock, GripVertical,
    ChevronUp, ChevronDown, ArrowUpToLine, ArrowDownToLine,
    Type, User, Building2, Briefcase, Hash, Users, Mail, Phone, QrCode, Square, Minus,
    MapPin, Heart, Calendar, CalendarX, Barcode, PenTool, Star, Shield, Image, Copy, Trash2
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
import { Input } from '@/components/ui/input';

interface LayerManagerProps {
    elements: CanvasElement[];
    selectedElementId: string | null;
    onSelectElement: (id: string) => void;
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
    onReorder: (id: string, action: 'front' | 'back' | 'forward' | 'backward') => void;
    onMoveLayer: (activeId: string, overId: string) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
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
    address: MapPin,
    blood_group: Heart,
    joining_date: Calendar,
    expiry_date: CalendarX,
    qr_code: QrCode,
    barcode: Barcode,
    signature: PenTool,
    custom_text: Type,
    shape: Square,
    divider: Minus,
    line: Minus,
    icon: Star,
    badge: Shield,
    image: Image,
};

interface SortableLayerItemProps {
    element: CanvasElement;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onUpdateElement: (id: string, updates: Partial<CanvasElement>) => void;
    onDuplicate?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const SortableLayerItem: React.FC<SortableLayerItemProps> = ({
    element,
    isSelected,
    onSelect,
    onUpdateElement,
    onDuplicate,
    onDelete,
}) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: element.id });
    const [isRenaming, setIsRenaming] = React.useState(false);
    const [label, setLabel] = React.useState(element.label);

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
                "group flex items-center gap-1.5 p-1.5 rounded-md transition-colors cursor-pointer",
                isSelected ? "bg-primary/10 border border-primary/20" : "hover:bg-muted border border-transparent",
                isDragging && "shadow-lg bg-background border-primary"
            )}
            onClick={() => onSelect(element.id)}
        >
            <div
                className="text-muted-foreground cursor-grab active:cursor-grabbing shrink-0"
                {...attributes}
                {...listeners}
            >
                <GripVertical className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            <div className={cn(
                "p-1 rounded bg-muted flex items-center justify-center shrink-0",
                isSelected && "bg-primary/20 text-primary"
            )}>
                <Icon className="w-3 h-3" />
            </div>

            <div className="flex-1 min-w-0">
                {isRenaming ? (
                    <Input
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                        onBlur={() => {
                            onUpdateElement(element.id, { label });
                            setIsRenaming(false);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                onUpdateElement(element.id, { label });
                                setIsRenaming(false);
                            }
                        }}
                        className="h-5 text-[10px] px-1"
                        autoFocus
                        onClick={(e) => e.stopPropagation()}
                    />
                ) : (
                    <div
                        className="text-[11px] font-medium truncate"
                        onDoubleClick={(e) => {
                            e.stopPropagation();
                            setIsRenaming(true);
                        }}
                    >
                        {element.label}
                    </div>
                )}
            </div>

            <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {onDuplicate && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={(e) => { e.stopPropagation(); onDuplicate(element.id); }}
                        title="Duplicate"
                    >
                        <Copy className="w-2.5 h-2.5 text-muted-foreground" />
                    </Button>
                )}
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => { e.stopPropagation(); onUpdateElement(element.id, { visible: !element.visible }); }}
                    title={element.visible !== false ? 'Hide' : 'Show'}
                >
                    {element.visible !== false ? <Eye className="w-2.5 h-2.5 text-muted-foreground" /> : <EyeOff className="w-2.5 h-2.5 text-destructive" />}
                </Button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-5 w-5"
                    onClick={(e) => { e.stopPropagation(); onUpdateElement(element.id, { locked: !element.locked }); }}
                    title={element.locked ? 'Unlock' : 'Lock'}
                >
                    {element.locked ? <Lock className="w-2.5 h-2.5 text-amber-500" /> : <Unlock className="w-2.5 h-2.5 text-muted-foreground" />}
                </Button>
                {onDelete && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-5 w-5"
                        onClick={(e) => { e.stopPropagation(); onDelete(element.id); }}
                        title="Delete"
                    >
                        <Trash2 className="w-2.5 h-2.5 text-destructive" />
                    </Button>
                )}
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
    onDuplicate,
    onDelete,
}) => {
    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

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
            <div className="p-3 border-b">
                <h3 className="text-sm font-semibold">Layers</h3>
                <p className="text-[10px] text-muted-foreground mt-0.5">
                    {elements.length} elements · Double-click to rename
                </p>
            </div>

            <ScrollArea className="flex-1">
                <div className="p-1.5 space-y-0.5">
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
                                        onDuplicate={onDuplicate}
                                        onDelete={onDelete}
                                    />
                                ))}
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </ScrollArea>

            {selectedElementId && (
                <div className="p-2 border-t bg-muted/30 grid grid-cols-4 gap-1">
                    <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => onReorder(selectedElementId, 'back')} title="Send to Back">
                        <ArrowDownToLine className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => onReorder(selectedElementId, 'backward')} title="Send Backward">
                        <ChevronDown className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => onReorder(selectedElementId, 'forward')} title="Bring Forward">
                        <ChevronUp className="w-3 h-3" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-7 w-full" onClick={() => onReorder(selectedElementId, 'front')} title="Bring to Front">
                        <ArrowUpToLine className="w-3 h-3" />
                    </Button>
                </div>
            )}
        </div>
    );
};