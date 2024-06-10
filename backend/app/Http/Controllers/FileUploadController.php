<?php

namespace App\Http\Controllers;

use App\Http\Requests\FileUploadRequest;
use App\Services\FileUploadService;

class FileUploadController extends Controller
{
    protected FileUploadService $fileUploadService;

    public function __construct(FileUploadService $fileUploadService)
    {
        $this->fileUploadService = $fileUploadService;
    }

    public function index(): \Illuminate\Http\JsonResponse
    {
        $files = $this->fileUploadService->list();

        return response()->json($files);
    }
    public function upload(FileUploadRequest $request): \Illuminate\Http\JsonResponse
    {
        $fileRecord = $this->fileUploadService->uploadFile($request->file('file'));

        return response()->json($fileRecord, 201);
    }
}
