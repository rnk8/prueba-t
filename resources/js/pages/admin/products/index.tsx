import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps, Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Pencil, Plus, Trash, LucideEye } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import ProductShow from './show';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Productos', href: route('admin.products.index') },
];

const ProductIndex = ({ products }: PageProps) => {
  const { errors } = usePage().props;
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showModal, setShowModal] = useState(false);


  const handlePagination = (url: string | null) => {
    if (url) {
      router.get(url);
    }
  };

  const handleDelete = (id: number) => {
    router.delete(route('admin.products.destroy', { product: id }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Categoría eliminada correctamente.");
      },
      onError: () => {
        toast.error("Ocurrió un error al eliminar la categoría.");
      }
    });
  };
  const handleEdit = (id: number) => {
    router.get(route('admin.products.edit', { product: id }));
  };

  const handleGet = (product: Product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleStore = () => {
    router.get(route('admin.products.create'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Productos" />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Heading title="Gestión de Productos" />
            <p className="text-muted-foreground">Administra los productos</p>
          </div>
          <Button onClick={handleStore} className="gap-2">
            <Plus className="h-4 w-4" />
            Nuevo Producto
          </Button>
        </div>

        <Separator />

        {errors && errors.error && (
          <Alert variant="destructive">
            <AlertDescription>{errors.error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="px-4 py-2 text-left">ID</TableHead>
                <TableHead className="px-4 py-2 text-left">Nombre</TableHead>
                <TableHead className="px-4 py-2 text-left">Categoría</TableHead>
                <TableHead className="px-4 py-2 text-right">Precio Compra</TableHead>
                <TableHead className="px-4 py-2 text-center">Tipo</TableHead>
                <TableHead className="px-4 py-2 text-right">Precio Venta</TableHead>
                <TableHead className="px-4 py-2 text-right">Stock</TableHead>
                <TableHead className="px-4 py-2 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.data ?? length > 0 ? (
                products?.data.map((product: Product) => (
                  <TableRow key={product.id}>
                    <TableCell className="px-4 py-2">{product.id}</TableCell>
                    <TableCell className="px-4 py-2">{product.product_name}</TableCell>
                    <TableCell className="px-4 py-2">{product.category?.name}</TableCell>
                    <TableCell className="px-4 py-2 text-right">${product.buying_price}</TableCell>
                    <TableCell className="px-4 py-2 text-center">
                      {product.type === 'platillo'
                        ? '🍲'
                        : product.type === 'bebida'
                          ? '🥤'
                          : '❓'}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right">${product.selling_price}</TableCell>
                    <TableCell className="px-4 py-2 text-right">{product.stock}</TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGet(product)} className="h-8 w-8 p-0">
                          <LucideEye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(product.id)}
                          className="h-8 w-8 p-0"
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="px-4 py-2 text-center">
                    No hay productos disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={products?.meta?.current_page === 1}
            onClick={() => handlePagination(products?.links?.prev ?? null)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={products?.meta?.current_page === products?.meta?.last_page}
            onClick={() => handlePagination(products?.links?.next ?? null)}
          >
            Siguiente
          </Button>
        </div>
      </div>
      {selectedProduct && (
        <ProductShow product={selectedProduct} open={showModal} onClose={() => setShowModal(false)} />
      )}
    </AppLayout>
  );
}
export default ProductIndex;
