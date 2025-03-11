import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideEye, Plus } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Ventas', href: route('admin.sales.index') },
];

const SalesIndex = ({ sales }: PageProps) => {
  const { errors } = usePage().props;
  const handlePagination = (url: string | null) => {
    if (url) {
      router.get(url);
    }
  };

  const handleShow = (id: number) => {
    router.get(route('admin.sales.show', { sale: id }));
  };

  const handleStore = () => {
    router.get(route('admin.sales.create'));
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Ventas" />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-2">
            <Heading title="Gestión de Ventas" />
            <p className="text-muted-foreground">Administra las ventas registradas</p>
          </div>
          <Button onClick={handleStore} className="gap-2">
            <Plus className="h-4 w-4" />
            Nueva Venta
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
                <TableHead className="px-4 py-2 text-left">Usuario</TableHead>
                <TableHead className="px-4 py-2 text-right">Total</TableHead>
                <TableHead className="px-4 py-2 text-left">Fecha</TableHead>
                <TableHead className="px-4 py-2 text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(sales?.data?.length ?? 0) > 0 ? (
                sales?.data.map((sale: any) => (
                  <TableRow key={sale.id}>
                    <TableCell className="px-4 py-2">{sale.id}</TableCell>
                    <TableCell className="px-4 py-2">{sale.user?.name || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      ${parseFloat(sale.total).toFixed(2)}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {sale.created_at ? new Date(sale.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShow(sale.id)}
                          className="h-8 w-8 p-0"
                        >
                          <LucideEye className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} className="px-4 py-2 text-center">
                    No hay ventas disponibles.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Paginación Mejorada */}
        <div className="flex justify-center items-center gap-4 mt-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination(sales?.links?.next ?? null)}
            disabled={sales?.meta?.current_page === 1}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePagination(sales?.links?.next ?? null)}
            disabled={sales?.meta?.current_page === sales?.meta?.last_page}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </AppLayout>
  );
};

export default SalesIndex;
