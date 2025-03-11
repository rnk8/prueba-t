// resources/js/pages/admin/units/show.tsx
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { PageProps, BreadcrumbItem } from '@/types';
import { Separator } from '@radix-ui/react-separator';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Unidades', href: route('admin.units.index') },
    { title: 'Detalle', href: '#' },
];

export default function UnitShow({ unit }: PageProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Perfil de ${unit.name}`} />
            <div className="max-w-4xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">{unit.name}</h1>
                    <p className="text-muted-foreground">{unit.abbreviation}</p>
                    <Separator />
                </div>

                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-6 bg-background p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold">Abreviación</h2>
                        <Separator />
                    </div>

                    <div className="space-y-6 bg-background p-6 rounded-lg border">
                        <h2 className="text-xl font-semibold">Unidad</h2>
                        <Separator />

                    </div>
                </div>
            </div>
        </AppLayout>
    );
}