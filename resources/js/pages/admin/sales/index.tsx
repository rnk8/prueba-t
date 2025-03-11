import React, { useState } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, PageProps, Sale, PaginatedData } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideEye, Plus } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';
import SaleShow from './show';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Ventas', href: route('admin.sales.index') },
];

interface SalesPageProps extends PageProps {
  sales?: PaginatedData<Sale>;
}

const SalesIndex = ({ sales }: SalesPageProps) => {
  const { errors } = usePage().props;
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [showModal, setShowModal] = useState(false);

  const handleShow = (sale: Sale) => {
    setSelectedSale(sale);
    setShowModal(true);
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
                sales?.data.map((sale: Sale) => (
                  <TableRow key={sale.id}>
                    <TableCell className="px-4 py-2">{sale.id}</TableCell>
                    <TableCell className="px-4 py-2">{sale.user?.name || 'N/A'}</TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      ${typeof sale.total === 'number' ? sale.total.toFixed(2) : sale.total}
                    </TableCell>
                    <TableCell className="px-4 py-2">
                      {sale.created_at ? new Date(sale.created_at).toLocaleDateString() : 'N/A'}
                    </TableCell>
                    <TableCell className="px-4 py-2 text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleShow(sale)}
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
      </div>

      {selectedSale && (
        <SaleShow sale={selectedSale} open={showModal} onClose={() => setShowModal(false)} />
      )}
    </AppLayout>
  );
};

export default SalesIndex;