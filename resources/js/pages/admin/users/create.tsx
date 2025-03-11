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

type CreaForm = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Usuarios', href: '/users' },
    { title: 'Crear Usuario', href: '#' },
];

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm<CreaForm>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('users.store'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
        
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear" />
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Nuevo Usuario</h1>
                    <p className="text-muted-foreground">
                        Completa los campos para registrar un nuevo usuario
                    </p>
                    <Separator />
                </div>

                <form onSubmit={submit} className="space-y-6 bg-background rounded-lg p-6 border">
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Juan Pérez"
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
                                placeholder="Ej: usuario@ejemplo.com"
                                disabled={processing}
                            />
                            <InputError message={errors.email} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="password">Contraseña</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    disabled={processing}
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                                <Input
                                    id="password_confirmation"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    disabled={processing}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Crear Usuario
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}