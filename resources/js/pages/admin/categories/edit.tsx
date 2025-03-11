import { Head, useForm, usePage } from '@inertiajs/react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { ArrowLeft, ExternalLink, Link, LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@radix-ui/react-separator';
import { toast } from 'sonner';



const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Categorías', href: route('admin.categories.index') },
  { title: 'Detalle', href: '#' },
];

const CategoryEdit = ({ category }: PageProps) => {
  const { data, setData, put, processing, errors } = useForm({
    name: category.name,
    description: category.description
  })

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    put(route('admin.categories.update', { category: category.id }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Actualizado con éxito 🎉");
      },
      onError: (errors) => {
        console.error("Error:", errors);
        toast.error("Ocurrió un error al actualizar la categoría.");
      }
    });
  };


  return (
    <AppLayout breadcrumbs={breadcrumbs}>

      <Head title="Editar Categoria" />
      <div className="max-w-2xl mx-auto p-6 space-y-8">

        <div className="space-y-2">
          <CardTitle className="flex items-center justify-between">
            <span>Actualiza Categoría</span>
            <Button variant="outline" size="sm" asChild>
              <a href={route('admin.categories.index')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </a>
            </Button>
          </CardTitle>
          <h1 className="text-3xl font-bold tracking-tight"></h1>
          <p className="text-muted-foreground">
            Actualiza la información de la Categoria seleccionada
          </p>
          <Separator />
        </div>

        <form onSubmit={submit} className="space-y-6 bg-background rounded-lg p-6 border">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
              />
              <InputError message={errors.name} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripcion</Label>
              <Input
                id="description"
                type="description"
                value={data.description}
                onChange={(e) => setData('description', e.target.value)}
                disabled={processing}
              />
              <InputError message={errors.description} />
            </div>

          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="submit"
              className="w-full sm:w-auto"
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
              Guardar Cambios
            </Button>
          </div>
        </form>
      </div>
    </AppLayout>
  );

}
export default CategoryEdit; 