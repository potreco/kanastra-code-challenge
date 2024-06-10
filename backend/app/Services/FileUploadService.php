<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use App\Models\File;

class FileUploadService
{
    public function list(): \Illuminate\Database\Eloquent\Collection
    {
        return File::all();
    }

    public function uploadFile(UploadedFile $file): File
    {
        $fileName = $file->getClientOriginalName();
        $fileSize = $file->getSize();
        $fileExtension = $file->getClientOriginalExtension();

        $fileRecord = File::create([
            'name' => $fileName,
            'size' => $fileSize,
            'extension' => $fileExtension,
        ]);

        $file->storeAs('uploads', $fileName);

        return $fileRecord;
    }
}
