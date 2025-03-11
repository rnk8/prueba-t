<?php

namespace App\Services;

use App\Models\Inventory;
use App\Models\Product;
use App\Models\Sale;
use App\Models\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class SaleService
{
    public function createSale(array $validated)
    {
        return DB::transaction(function () use ($validated) {
            $sale = Sale::create([
                'user_id' => auth()->id(),
                'total' => 0,
            ]);

            $total = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::lockForUpdate()->findOrFail($item['id']);

                if ($product->stock < $item['quantity']) {
                    throw new \Exception("No hay suficiente stock para {$product->product_name}. Disponible: {$product->stock}, Solicitado: {$item['quantity']}");
                }

                $product->stock -= $item['quantity'];
                $product->save();

                Log::info("Stock actualizado para producto {$product->id}: nuevo stock {$product->stock}");

                $sale->products()->attach($product->id, [
                    'quantity' => $item['quantity'],
                    'unit_price' => $product->selling_price
                ]);

                $total += $item['quantity'] * $product->selling_price;

                Inventory::create([
                    'product_id' => $product->id,
                    'quantity' => -$item['quantity'],
                    'operation_type' => 'salida',
                    'reference_type' => Sale::class,
                    'reference_id' => $sale->id,
                    'unit_price' => $product->selling_price,
                ]);

                $this->updateOrCreateStorage($product->id, $item['quantity'], $validated['location']);
            }

            $sale->update(['total' => $total]);

            return $sale;
        });
    }

    private function updateOrCreateStorage($productId, $quantity, $location)
    {
        try {
            $storage = Storage::where('product_id', $productId)
                ->where('location', $location)
                ->first();

            if ($storage) {
                $storage->quantity += $quantity;
                $storage->save();
            } else {
                Storage::create([
                    'product_id' => $productId,
                    'quantity' => $quantity,
                    'location' => $location
                ]);
            }
        } catch (\Exception $e) {
            Log::error("Error actualizando storage: " . $e->getMessage());
            throw $e;
        }
    }
}
