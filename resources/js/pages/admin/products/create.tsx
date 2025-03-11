// resources/js/pages/admin/products/create.tsx
import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, CreateProductProps, PageProps } from '@/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import InputError from '@/components/input-error';
import { LoaderCircle } from 'lucide-react';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from "sonner";

export default function CreateProduct({ categories, measurementUnits, productTypes }: CreateProductProps) {
    const { data, setData, post, processing, errors } = useForm({
        product_name: '',
        description: '',
        buying_price: '',
        selling_price: '',
        stock: '',
        type: 'platillo',
        category_id: '',
        measurement_unit_id: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('admin.products.store'), {
            onSuccess: () => {
                toast.success("creado con éxito 🎉");
            },
            onError: (errors) => {
                console.error("Error:", errors);    
                toast.error("Ocurrió un error.");
            }
        });
    };


    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Productos', href: route('admin.products.index') },
        { title: 'Crear Producto', href: '#' },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Crear Producto" />
            <div className="flex h-full flex-1 flex-col gap-4 p-6">

                <CardHeader>
                    <CardTitle>Nuevo Producto</CardTitle>
                </CardHeader>
                <CardContent className="h-full flex flex-col">
                    <form onSubmit={submit} className="flex flex-col h-full justify-between">
                        {/* Campos del formulario */}
                        <div className="space-y-6 flex-1">
                            {/* Sección de Nombre */}
                            <div className="grid gap-4">
                                <Label htmlFor="product_name">Nombre</Label>
                                <Input
                                    id="product_name"
                                    value={data.product_name}
                                    onChange={(e) => setData('product_name', e.target.value)}
                                    disabled={processing}
                                    className="w-full"
                                />
                                <InputError message={errors.product_name} className="mt-1" />
                            </div>

                            {/* Sección de Descripción */}
                            <div className="grid gap-4">
                                <Label htmlFor="description">Descripción</Label>
                                <Input
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    disabled={processing}
                                    className="w-full"
                                />
                                <InputError message={errors.description} className="mt-1" />
                            </div>

                            {/* Sección de Categoría */}
                            <div className="grid gap-4">
                                <Label htmlFor="category_id">Categoría</Label>
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    disabled={processing}
                                    className="w-full input"
                                >
                                    <option value="">Selecciona una categoría</option>
                                    {categories.map((cat) => (
                                        <option key={cat.id} value={cat.id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.category_id} className="mt-1" />
                            </div>

                            {/* Sección de Unidad de Medida */}
                            <div className="grid gap-4">
                                <Label htmlFor="measurement_unit_id">Unidad de Medida</Label>
                                <select
                                    id="measurement_unit_id"
                                    value={data.measurement_unit_id}
                                    onChange={(e) => setData('measurement_unit_id', e.target.value)}
                                    disabled={processing}
                                    className="w-full input"
                                >
                                    <option value="">Selecciona una unidad</option>
                                    {measurementUnits.map((unit) => (
                                        <option key={unit.id} value={unit.id}>
                                            {unit.name} ({unit.abbreviation})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.measurement_unit_id} className="mt-1" />
                            </div>

                            {/* Sección de Precios */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Label htmlFor="buying_price">Precio de Costo</Label>
                                    <Input
                                        id="buying_price"
                                        type="number"
                                        value={data.buying_price}
                                        onChange={(e) => setData('buying_price', e.target.value)}
                                        className="w-full"
                                    />
                                    <InputError message={errors.buying_price} className="mt-1" />
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="selling_price">Precio de Venta</Label>
                                    <Input
                                        id="selling_price"
                                        type="number"
                                        value={data.selling_price}
                                        onChange={(e) => setData('selling_price', e.target.value)}
                                        className="w-full"
                                    />
                                    <InputError message={errors.selling_price} className="mt-1" />
                                </div>
                            </div>

                            {/* Sección de Stock e Tipo */}
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-4">
                                    <Label htmlFor="stock">Stock Inicial</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        className="w-full"
                                    />
                                    <InputError message={errors.stock} className="mt-1" />
                                </div>

                                <div className="space-y-4">
                                    <Label htmlFor="type">Tipo de Producto</Label>
                                    <select
                                        id="type"
                                        value={data.type}
                                        onChange={(e) => setData('type', e.target.value)}
                                        className="w-full input"
                                    >
                                        {Object.entries(productTypes).map(([value, label]) => (
                                            <option key={value} value={value}>{label}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Botón de Envío */}
                        <div className="flex justify-end mt-6">
                            <Button type="submit" disabled={processing}>
                                {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2" />}
                                Guardar Producto
                            </Button>
                        </div>
                    </form>
                </CardContent>

            </div>
        </AppLayout>
    );
}