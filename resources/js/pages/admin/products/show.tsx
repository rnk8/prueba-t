import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { Separator } from '@/components/ui/separator';
import { Product } from '@/types';

interface ProductShowProps {
  product: Product;
  open: boolean;
  onClose: (open: boolean) => void;
}

const ProductShow = ({ product, open, onClose }: ProductShowProps) => {
  const additionalInfo = Object.entries(product).filter(
    ([key]) => key !== 'product_name' && key !== 'description'
  );

  // Reemplazando any con unknown para mayor seguridad tipográfica
  const formatValue = (value: unknown) => {
    if (typeof value === 'object' && value !== null) {
      return (value as { name?: string }).name || JSON.stringify(value);
    }
    return String(value);

  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto p-6 space-y-8">
        <DialogHeader>
          <DialogTitle>{product.product_name}</DialogTitle>
          <DialogClose />
        </DialogHeader>
        {/* Se agrega la descripción accesible con fallback */}
        <DialogDescription>
          {product.type || 'Sin descripción disponible.'}
        </DialogDescription>
        <Head title={`Perfil de ${product.product_name}`} />
        {additionalInfo.length > 0 && (
          <>
            <Separator />
            <div className="space-y-2">
              <h2 className="text-xl font-semibold">Información Adicional</h2>
              <ul>
                {additionalInfo.map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {formatValue(value)}
                  </li>
                ))}
              </ul>
            </div>
            <Separator />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ProductShow;