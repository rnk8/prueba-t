import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Unidades', href: route('admin.units.index') },
    { title: 'Detalle', href: '#' },
];

const UnitCreate = () => {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        abbreviation: ''
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.units.store'), {
            onSuccess: () => {
                toast.success("creado con éxito 🎉");
            },
            onError: (errors) => {
                console.error("Error:", errors);
                toast.error("Ocurrió un error.");
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Units" />
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Nueva Units</h1>
                    <p className="text-muted-foreground">
                        Completa los campos para crear una nueva Units
                    </p>
                    <Separator />
                </div>

                <form onSubmit={submit}>
                    <div className="grid gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Nombre *</Label>
                            <Input
                                id="name"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                placeholder="Ej: Litros"
                                disabled={processing}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="abbreviation">Abbreviation</Label>
                            <Input
                                id="abbreviation"
                                value={data.abbreviation}
                                onChange={(e) => setData('abbreviation', e.target.value)}
                                placeholder="Ej: Kg, Lt, m2"
                                disabled={processing}
                            />
                            {errors.abbreviation && <InputError message={errors.abbreviation} />}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4">
                        <Button
                            type="submit"
                            className="w-full sm:w-auto"
                            disabled={processing}
                        >
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Crear Units
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
export default UnitCreate; // ← Esta línea es crucial