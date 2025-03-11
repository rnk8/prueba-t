import React from 'react';
import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Unit, PageProps, BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideEye, Pencil, Plus, Trash } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Unidades', href: route('admin.units.index') },
];

const UnitIndex = ({ units }: PageProps) => {
  const handleDelete = (id: number) => {
    if (confirm("¿Estás seguro de eliminar esta unidad?")) {
      router.delete(route('admin.units.destroy', { unit: id }));
    }
  };

  const handleUpdate = (id: number) => {
    router.get(route('admin.units.edit', { unit: id }));
  };

  const handleStore = () => {
    router.get(route('admin.units.create'));
  };

  const handleGet = (id: number) => {
    router.get(route('admin.units.show', { unit: id }));
  };

  const handlePagination = (url: string | null) => {
    if (url) {
      router.get(url);
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Unidades de Medida" />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Heading title="Gestión de Unidades de Medida" />
            <p className="text-muted-foreground">
              Administra las unidades de medida en la plataforma
            </p>
          </div>
          <Button onClick={handleStore} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Unidad
          </Button>
        </div>
        <Separator />
        {false && (
          <Alert variant="destructive">
            <AlertDescription>{/* Mensaje de error */}</AlertDescription>
          </Alert>
        )}

        <div className="rounded-lg border">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[100px]">ID</TableHead>
                <TableHead>Nombre</TableHead>
                <TableHead>Abreviación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(units?.data?.length || 0) > 0 ? (
                units!.data!.map((unit: Unit) => (
                  <TableRow key={unit.id}>
                    <TableCell className="font-medium">{unit.id}</TableCell>
                    <TableCell>{unit.name}</TableCell>
                    <TableCell>{unit.abbreviation}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleUpdate(unit.id)} className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleGet(unit.id)} className="h-8 w-8 p-0">
                          <LucideEye className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(unit.id)} className="h-8 w-8 p-0">
                          <Trash className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No hay unidades disponibles.
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
            disabled={units?.meta?.current_page === 1}
            onClick={() => handlePagination(units?.links?.prev ?? null)}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            disabled={units?.meta?.current_page === units?.meta?.last_page}
            onClick={() => handlePagination(units?.links?.next ?? null)}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default UnitIndex;
