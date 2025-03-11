import { Head, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    roles: { id: number; name: string }[];
    permissions: { id: number; name: string }[];
}

interface ShowUserProps {
    user: User;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/users' },
    { title: 'Mostrar Usuario', href: '#' },
];

export default function ShowUser({ user }: ShowUserProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Perfil de ${user.name}`} />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{user.name}</h1>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Separator />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6 bg-background p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold">Roles asignados</h2>
                        <Separator />
                        {user.roles.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.roles.map((role) => (
                                    <Badge
                                        key={role.id}
                                        variant="secondary"
                                        className="text-sm px-3 py-1"
                                    >
                                        {role.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Sin roles asignados</p>
                        )}
                    </div>

                    <div className="space-y-6 bg-background p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold">Permisos directos</h2>
                        <Separator />
                        {user.permissions.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {user.permissions.map((permission) => (
                                    <Badge
                                        key={permission.id}
                                        variant="outline"
                                        className="text-sm px-3 py-1"
                                    >
                                        {permission.name}
                                    </Badge>
                                ))}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">Sin permisos directos</p>
                        )}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}