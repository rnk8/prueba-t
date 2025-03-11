import { Head, useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LoaderCircle } from 'lucide-react';
import { PageProps, Product } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';


import { toast } from 'sonner';

interface SalesCreateProps {
  products: Product[];
}

export default function SalesCreate({ products = [] }: SalesCreateProps) {

  const { data, setData, post, processing, errors, reset } = useForm({
    items: [] as Array<{ id: number; quantity: number }>,
    location: 'caja_principal',
  });

  // Agregar producto al carrito
  const addToCart = (product: Product) => {
    const existingItem = data.items.find(item => item.id === product.id);

    // Verificar si hay stock disponible
    if (product.stock <= 0) {
      toast.error(`${product.product_name} no tiene unidades disponibles`);
      return;
    }

    const newItems = existingItem
      ? data.items.map(item =>
        item.id === product.id
          ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
          : item
      )
      : [...data.items, { id: product.id, quantity: 1 }];

    setData('items', newItems);
  };

  const handleSubmit = () => {
    if (data.items.length === 0) {
      toast.error("Selecciona al menos un producto para despachar");
      return;
    }

    post(route('admin.sales.store'), {
      preserveScroll: true,
      onSuccess: () => {
        reset('items');
        toast.success("Productos despachados correctamente");
      },
      onError: (errors) => {
        console.error('Errores:', errors);
        toast.error("Ha ocurrido un error al procesar el despacho");
      }
    });
  };

  return (
    <AppLayout>
      <Head title="Despacho de Productos" />
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">Despacho de Productos</h1>
            <p className="text-muted-foreground">Selecciona los productos a despachar</p>
          </div>
          <Badge variant="outline" className="text-lg">
            Total Items: {data.items.reduce((sum, item) => sum + item.quantity, 0)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lista de Productos */}
          <div className="lg:col-span-2 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              {products?.map(product => (
                <div
                  key={product.id}
                  className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => addToCart(product)}
                >
                  <div className="flex justify-between">
                    <h3 className="font-medium">{product.product_name}</h3>
                    <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                      Stock: {product.stock}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">${product.selling_price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Carrito */}
          <div className="lg:col-span-1 space-y-4">
            <div className="border rounded-lg p-4 bg-background">
              <h2 className="text-lg font-semibold mb-4">Detalles de Despacho</h2>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Ubicación de destino</label>
                <Select
                  value={data.location}
                  onValueChange={(value) => setData('location', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona ubicación" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="caja_principal">Caja Principal</SelectItem>
                    <SelectItem value="barra">Barra</SelectItem>
                    <SelectItem value="cocina">Cocina</SelectItem>
                    <SelectItem value="almacen">Almacén</SelectItem>
                  </SelectContent>
                </Select>
                {errors.location && (
                  <p className="text-sm text-red-500 mt-1">{errors.location}</p>
                )}
              </div>

              {data.items.length > 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Producto</TableHead>
                        <TableHead>Cantidad</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {data.items.map(item => {
                        const product = products.find(p => p.id === item.id);
                        return (
                          <TableRow key={item.id}>
                            <TableCell>{product?.product_name}</TableCell>
                            <TableCell>
                              <Input
                                type="number"
                                value={item.quantity}
                                onChange={e => {
                                  const value = Number(e.target.value);
                                  const maxValue = product ? product.stock : 1;

                                  const newItems = data.items.map(i =>
                                    i.id === item.id ? {
                                      ...i,
                                      quantity: Math.min(Math.max(1, value), maxValue)
                                    } : i
                                  );
                                  setData('items', newItems);
                                }}
                                className="w-20"
                                min="1"
                                max={product?.stock || 1}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>

                  <Button
                    className="w-full mt-4"
                    onClick={handleSubmit}
                    disabled={processing}
                  >
                    {processing && <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />}
                    Confirmar Despacho
                  </Button>
                </>
              ) : (
                <p className="text-muted-foreground text-center py-6">
                  Selecciona productos para comenzar
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}