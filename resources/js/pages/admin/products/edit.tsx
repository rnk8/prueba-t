// resources/js/pages/admin/products/edit.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { BreadcrumbItem, EditProductProps } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { FormEventHandler } from 'react';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Productos', href: route('admin.products.index') },
  { title: 'Editar Producto', href: '#' },
];

export default function EditProduct({ product, categories, measurementUnits }: EditProductProps) {
  const { data, setData, put, processing, errors } = useForm({
    product_name: product.product_name,
    description: product.description || '',
    price: product.buying_price.toString(),
    category_id: product.category_id.toString(),
    measurement_unit_id: product.measurement_unit_id.toString(),
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    put(route('admin.products.update', product.id), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Producto actualizado con éxito");
      },
      onError: (err) => {
        console.error("Error:", err);
        toast.error("Ocurrió un error al actualizar el producto");
      }
    });
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Editar Producto" />
      <div className="max-w-2xl mx-auto p-6 space-y-8">
        <div className="space-y-2">
          <CardTitle className="flex items-center justify-between">
            <span>Editar Producto</span>
            <Button variant="outline" size="sm" asChild>
              <a href={route('admin.products.index')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </a>
            </Button>
          </CardTitle>
          <p className="text-muted-foreground">
            Actualiza la información del producto seleccionado.
          </p>
          <Separator />
        </div>

        <form onSubmit={submit} className="space-y-6 bg-background rounded-lg p-6 border">
          <CardHeader>
            <CardTitle>Detalles del Producto</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="product_name">Nombre</Label>
              <Input
                id="product_name"
                value={data.product_name}
                onChange={(e) => setData('product_name', e.target.value)}
                disabled={processing}
              />
              <InputError message={errors.product_name} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                disabled={processing}
              />
              <InputError message={errors.description} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                type="number"
                value={data.price}
                onChange={(e) => setData('price', e.target.value)}
                disabled={processing}
              />
              <InputError message={errors.price} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category_id">Categoría</Label>
              <select
                id="category_id"
                value={data.category_id}
                onChange={(e) => setData('category_id', e.target.value)}
                disabled={processing}
                className="input"
              >
                <option value="">Selecciona una categoría</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
              <InputError message={errors.category_id} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="measurement_unit_id">Unidad de Medida</Label>
              <select
                id="measurement_unit_id"
                value={data.measurement_unit_id}
                onChange={(e) => setData('measurement_unit_id', e.target.value)}
                disabled={processing}
                className="input"
              >
                <option value="">Selecciona una unidad</option>
                {measurementUnits.map((unit) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.name} ({unit.abbreviation})
                  </option>
                ))}
              </select>
              <InputError message={errors.measurement_unit_id} />
            </div>
          </CardContent>

          <div className="flex justify-end gap-4">
            <Button type="submit" className="w-full sm:w-auto" disabled={processing}>
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );
}
