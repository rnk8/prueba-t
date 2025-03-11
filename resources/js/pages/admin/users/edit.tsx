import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

interface User {
    user: {
        id: number;
        name: string;
        email: string;
        password: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/users' },
    { title: 'Editar Usuario', href: '#' },
];

export default function EditUser({ user }: User) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name,
        email: user.email,
        password: user.password,
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('admin.users.update', { id: user.id }), {
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
            <Head title="Editar Usuario" />
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Editar Usuario</h1>
                    <p className="text-muted-foreground">
                        Actualiza la información del usuario seleccionado
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
                            <Label htmlFor="email">Correo electrónico</Label>
                            <Input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Nueva contraseña</Label>
                            <Input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData('password', e.target.value)}
                                placeholder="Dejar vacío para mantener la actual"
                                disabled={processing}
                            />
                            <InputError message={errors.password} />
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