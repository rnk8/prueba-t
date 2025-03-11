import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Category, PageProps, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideEye, Pencil, Plus, Trash } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { useState } from 'react';
import CategoryShow from './show';


const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Categorías', href: route('admin.categories.index') }
];

const CategoryIndex = ({ categories }: PageProps) => {
  const { errors } = usePage().props;
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);


  const handleDelete = (id: number) => {
    router.delete(route('admin.categories.destroy', { category: id }), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success("Categoría eliminada correctamente.");
      },
      onError: () => {
        toast.error("Ocurrió un error al eliminar la categoría.");
      }
    });
  };

  const handleUpdate = (slug: string) => {
    router.get(route('admin.categories.edit', { category: slug }), {
      preserveScroll: true,
    });
  };

  const handleStore = () => {
    router.get(route('admin.categories.create'));
  };

  const handleGet = (category: Category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handlePagination = (url: string | null) => {
    if (url) {
      router.get(url);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Categorías" />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Heading title="Gestión de Categorías" />
            <p className="text-muted-foreground">
              Administra las categorías registradas en la plataforma
            </p>
          </div>
          <Button onClick={handleStore} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Categoría
          </Button>
        </div>

        <Separator />

        {errors && errors.error && (
          <Alert variant="destructive">
            <AlertDescription>{errors.error}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Descripción</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(categories?.data ?? []).length > 0 ? (
                (categories?.data ?? []).map((category: Category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>{category.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleUpdate(category.slug)} className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGet(category)} className="h-8 w-8 p-0">
                          <LucideEye className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(category.id)} className="h-8 w-8 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No hay categorías disponibles.
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
            disabled={(categories?.meta?.current_page ?? 1) === 1}
            onClick={() => handlePagination(categories?.links?.prev ?? null)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={(categories?.meta?.current_page ?? 1) === (categories?.meta?.last_page ?? 1)}
            onClick={() => handlePagination(categories?.links?.next ?? null)}
          >
            Siguiente
          </Button>
        </div>
      </div>
      {selectedCategory && (
        <CategoryShow category={selectedCategory} open={showModal} onClose={() => setShowModal(false)} />
      )}
    </AppLayout>
  );
};

export default CategoryIndex;
