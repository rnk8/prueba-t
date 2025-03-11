import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose, DialogDescription } from '@/components/ui/dialog';
import { Head } from '@inertiajs/react';
import { Separator } from '@/components/ui/separator';
import { Sale } from '@/types';

interface SaleShowProps {
  sale: Sale;
  open: boolean;
  onClose: (open: boolean) => void;
}

const SaleShow = ({ sale, open, onClose }: SaleShowProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl mx-auto p-6 space-y-8">
        <DialogHeader>
          <DialogTitle>Venta #{sale.id}</DialogTitle>
          <DialogClose />
        </DialogHeader>

        <DialogDescription>
          <p><strong>Usuario:</strong> {sale.user?.name || 'N/A'}</p>
          <p><strong>Total:</strong> ${typeof sale.total === 'number' ? sale.total.toFixed(2) : sale.total}</p>
          <p><strong>Fecha:</strong> {new Date(sale.created_at).toLocaleDateString()}</p>
        </DialogDescription>

        <Separator />

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Productos en la Venta</h2>
          <ul>
            {sale.products?.map((product) => (
              <li key={product.id} className="p-4 bg-gray-100 rounded-md">
                <p><strong>{product.name}</strong></p>
                <p>Cantidad: {product.pivot.quantity}</p>
                {/* <p>Nombre Del Producto: {product.product_name}</p> */}
                <p>Total: ${typeof product.pivot.quantity === 'number' && typeof product.pivot.unit_price === 'number'
                  ? (product.pivot.quantity * product.pivot.unit_price).toFixed(2)
                  : (product.pivot.quantity * product.pivot.unit_price)}</p>
              </li>
            ))}
          </ul>
        </div>

        <Separator />
      </DialogContent>
    </Dialog>
  );
};

export default SaleShow;