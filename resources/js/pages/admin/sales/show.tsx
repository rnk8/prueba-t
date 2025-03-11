// resources/js/pages/admin/products/show.tsx
import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ShowProductProps {
  product: Product;
}

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Productos', href: route('admin.products.index') },
  { title: 'Detalle', href: '#' },
];

export default function ShowProduct({ product }: ShowProductProps) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Producto: ${product.product_name}`} />
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">{product.product_name}</h1>
          <p className="text-muted-foreground">{product.description}</p>
          <Separator />
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            <p>
              <strong>Precio:</strong> ${product.buying_price}
            </p>
            <p>
              <strong>Categoría:</strong> {product.category?.name}
            </p>
            <p>
              <strong>Unidad de Medida:</strong> {product.measurementUnit?.name} ({product.measurementUnit?.abbreviation})
            </p>
          </div>
          <div className="space-y-4">
            {/* Aquí podrías agregar imágenes o información adicional */}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
