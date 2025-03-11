<?php
// app/Services/UnitService.php
namespace App\Services;

use App\Models\MeasurementUnit;

class UnitService
{
    public function getPaginatedUnits($perPage = 10)
    {
        return MeasurementUnit::latest()->paginate($perPage);
    }
    public function getUnitById($id)
    {
        return MeasurementUnit::findOrFail($id);
    }

    public function createUnit(array $data)
    {
        return MeasurementUnit::create($data);
    }

    public function updateUnit($id, array $data)
    {
        $unit = MeasurementUnit::findOrFail($id);
        $unit->update($data);
        return $unit;
    }

    public function deleteUnit($id)
    {
        $unit = MeasurementUnit::findOrFail($id);
        $unit->delete();
        return true;
    }
}