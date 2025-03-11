import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { Separator } from '@/components/ui/separator';
import { Category } from '@/types';

interface CategoryShowProps {
  category: Category;
  open: boolean;
  onClose: (open: boolean) => void;
}

const CategoryShow = ({ category, open, onClose }: CategoryShowProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto p-6 space-y-8">
        <DialogHeader>
          <DialogTitle>{category.name}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {/* Se agrega la descripción accesible */}
        <DialogDescription>
          {category.description || "Sin descripción disponible."}
        </DialogDescription>
        <Head title={`Perfil de ${category.name}`} />
        <div className="space-y-2">
          <Separator />
        </div>
        {category.name && (
          <div className="space-y-2">
            <h2 className="text-xl font-semibold">Información Adicional</h2>
            <ul>
              {Object.entries(category).map(([key, value]) => (
                <li key={key}><strong>{key}:</strong> {value}</li>
              ))}
            </ul>
            <Separator />
          </div>
        )}
        <Separator />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryShow;
