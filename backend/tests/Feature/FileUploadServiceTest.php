<?php

namespace Tests\Feature;


use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Services\FileUploadService;

class FileUploadServiceTest extends TestCase
{
    use RefreshDatabase;

    protected FileUploadService $fileUploadService;

    protected function setUp(): void
    {
        parent::setUp();
        $this->fileUploadService = new FileUploadService();
    }

    public function test_upload_file()
    {
        $file = UploadedFile::fake()->create('testfile.txt', 100);

        $fileRecord = $this->fileUploadService->uploadFile($file);

        $this->assertDatabaseHas('files', [
            'name' => 'testfile.txt',
            'size' => 102400,
            'extension' => 'txt',
        ]);

        $this->assertEquals('testfile.txt', $fileRecord->name);
        $this->assertEquals(102400, $fileRecord->size);
        $this->assertEquals('txt', $fileRecord->extension);
    }
}
