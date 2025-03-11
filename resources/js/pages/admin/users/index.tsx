import React, { useState } from 'react';
import { Head, usePage, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, User, type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LucideEye, Pencil, Plus, Trash } from 'lucide-react';
import Heading from '@/components/heading';
import { Separator } from '@/components/ui/separator';



const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/users' },
];

const handleDelete = (id: number) => {
    router.delete(`/users/${id}`);
};

const handleUpdate = (id: number) => {
    router.get(route('users.edit', { id }));
};

const handleStore = () => {
    router.get(route('users.create'));
};

const handleGet = (id: number) => {
    router.get(route('users.show', { id }));
};

export default function Users() {
    const { users } = usePage<PageProps>().props;
    const [error, setError] = useState<string | null>(null);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Usuarios" />
            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-2">
                        <Heading title="Gestión de Usuarios" />
                        <p className="text-muted-foreground">
                            Administra los usuarios registrados en la plataforma
                        </p>
                    </div>
                    <Button onClick={handleStore} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Nuevo Usuario
                    </Button>
                </div>

                <Separator />

                {error && (
                    <Alert variant="destructive">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                <div className="rounded-lg border">
                    <Table>
                        <TableHeader className="bg-muted/50">
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead className="text-center">Verificado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users?.data.map((user: User) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell className="text-center">
                                        {user.email_verified_at ? (
                                            <Badge variant="outline">Verificado</Badge>
                                        ) : (
                                            <Badge variant="destructive">Pendiente</Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleUpdate(user.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleGet(user.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <LucideEye className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(user.id)}
                                                className="h-8 w-8 p-0"
                                            >
                                                <Trash className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Paginación Simple */}
                <div className="flex justify-center gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={users?.meta?.current_page === 1}

                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        disabled={users?.meta?.current_page === users?.meta?.last_page}

                    >
                        Siguiente
                    </Button>
                </div>
            </div>
        </AppLayout>
    );
}