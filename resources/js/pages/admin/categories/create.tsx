import { Head, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CreateCategoryProps } from '@/types';
import { LoaderCircle } from 'lucide-react';
import { Separator } from '@radix-ui/react-separator';
import InputError from '@/components/input-error';
import { toast } from 'sonner';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Categorías', href: route('admin.categories.index') },
    { title: 'Detalle', href: '#' },
];

export default function CreateCategory({ categories }: CreateCategoryProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        slug: '',
        parent_id: '' 
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.categories.store'), {
            onSuccess: () => {
                toast.success("Categoría creada con éxito 🎉");
            },
            onError: (errors) => {
                console.error("Error:", errors);
                toast.error("Ocurrió un error.");
            }
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Categoría" />
            <div className="max-w-2xl mx-auto p-6 space-y-8">
                <div className="space-y-2">
                    <h1 className="text-3xl font-bold tracking-tight">Nueva Categoría</h1>
                    <p className="text-muted-foreground">
                        Completa los campos para crear una nueva categoría
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
                                placeholder="Ej: Bebidas"
                                disabled={processing}
                            />
                            {errors.name && <InputError message={errors.name} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Descripción</Label>
                            <Input
                                id="description"
                                value={data.description}
                                onChange={(e) => setData('description', e.target.value)}
                                placeholder="Ej: Todas las bebidas de la carta"
                                disabled={processing}
                            />
                            {errors.description && <InputError message={errors.description} />}
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="parent_id">Categoría Padre</Label>
                            <select
                                id="parent_id"
                                className="border rounded p-2 w-full"
                                value={data.parent_id}
                                onChange={(e) => setData('parent_id', e.target.value)}
                                disabled={processing}
                            >
                                <option value="">Ninguna</option>
                                {categories?.map((cat) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                            {errors.parent_id && <InputError message={errors.parent_id} />}
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-4">
                        <Button type="submit" className="w-full sm:w-auto" disabled={processing}>
                            {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                            Crear Categoría
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
