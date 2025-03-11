<?php
// HandlesApiExceptions.php
namespace App\Traits;

use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

trait HandlesApiExceptions
{
    protected function handleResponse(callable $callback, string $resourceKey = null, int $successCode = 200, string $message = null): JsonResponse
    {
        try {
            $result = $callback();

            $response = [];
            if ($resourceKey && is_object($result) && method_exists($result, 'toArray')) {
                $response[$resourceKey] = $result->toArray();
            }
            if ($message) {
                $response['message'] = $message;
            }

            return response()->json($response, $successCode);

        } catch (ModelNotFoundException $e) {
            Log::warning('Recurso no encontrado: ' . $e->getMessage());
            return response()->json(['message' => 'Recurso no encontrado'], 404);

        } catch (\Throwable $th) {
            Log::error('Error en API: ' . $th->getMessage());
            return response()->json([
                'message' => 'Error interno del servidor',
                'error' => config('app.debug') ? $th->getMessage() : null
            ], 500);
        }
    }
}