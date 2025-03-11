<?php
// app/Traits/HandlesInertiaExceptions.php
namespace App\Traits;

use Illuminate\Support\Facades\Log;
use Illuminate\Database\Eloquent\ModelNotFoundException;

trait HandlesInertiaExceptions
{
    protected function handleInertiaResponse(
        callable $callback,
        string $successRoute,
        string $successMessage,
        string $errorMessage,
        string $errorRoute = null
    ) {
        try {
            $callback();
            
            return redirect()
                ->route($successRoute)
                ->with('success', $successMessage);
                
        } catch (ModelNotFoundException $e) {
            Log::warning('Recurso no encontrado: ' . $e->getMessage());
            return redirect()
                ->back()
                ->with('error', 'Recurso no encontrado');
                
        } catch (\Throwable $th) {
            Log::error($errorMessage . ': ' . $th->getMessage());
            
            $redirect = $errorRoute 
                ? redirect()->route($errorRoute)
                : redirect()->back();
                
            return $redirect
                ->withInput()
                ->with('error', $errorMessage);
        }
    }
}