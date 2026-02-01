import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ElementType, DEFAULT_ELEMENTS, ELEMENT_ICONS } from '@/types/design-studio';
import { 
  Building2, User, Type, Briefcase, Hash, Users, Mail, Phone, 
  QrCode, Text, Square, Minus, Plus, GripVertical
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Building2,
  User,
  Type,
  Briefcase,
  Hash,
  Users,
  Mail,
  Phone,
  QrCode,
  Text,
  Square,
  Minus,
};

interface ElementToolboxProps {
  onAddElement: (type: ElementType) => void;
  existingElements: ElementType[];
}

export const ElementToolbox: React.FC<ElementToolboxProps> = ({
  onAddElement,
  existingElements,
}) => {
  const dataElements: ElementType[] = ['company_logo', 'profile_photo', 'name', 'designation', 'employee_id', 'department', 'email', 'phone', 'qr_code'];
  const decorativeElements: ElementType[] = ['custom_text', 'shape', 'divider'];

  const renderElementButton = (type: ElementType) => {
    const config = DEFAULT_ELEMENTS[type];
    const IconComponent = iconMap[ELEMENT_ICONS[type]];
    const isAlreadyAdded = existingElements.includes(type) && !['custom_text', 'shape', 'divider'].includes(type);

    return (
      <Button
        key={type}
        variant="outline"
        size="sm"
        className="w-full justify-start gap-2 h-auto py-2 px-3"
        onClick={() => onAddElement(type)}
        disabled={isAlreadyAdded}
      >
        <div className="flex items-center gap-2 flex-1">
          <GripVertical className="w-3 h-3 text-muted-foreground" />
          {IconComponent && <IconComponent className="w-4 h-4" />}
          <span className="text-xs">{config?.label || type}</span>
        </div>
        {isAlreadyAdded ? (
          <span className="text-[10px] text-muted-foreground">Added</span>
        ) : (
          <Plus className="w-3 h-3" />
        )}
      </Button>
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="py-3 px-4">
        <CardTitle className="text-sm font-medium">Elements</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[calc(100vh-400px)]">
          <div className="px-4 pb-4 space-y-4">
            {/* Data Elements */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Data Fields
              </h4>
              <div className="space-y-1">
                {dataElements.map(renderElementButton)}
              </div>
            </div>

            {/* Decorative Elements */}
            <div>
              <h4 className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wider">
                Decorative
              </h4>
              <div className="space-y-1">
                {decorativeElements.map(renderElementButton)}
              </div>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
