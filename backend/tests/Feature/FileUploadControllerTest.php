<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class FileUploadControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_file_upload()
    {
        Storage::fake('local');

        $file = UploadedFile::fake()->create('testfile.txt', 100);

        $response = $this->post('api/upload', [
            'file' => $file,
        ]);

        $response->assertStatus(201);
        $response->assertJson([
            'name' => 'testfile.txt',
            'size' => 102400,
            'extension' => 'txt',
        ]);

        $this->assertDatabaseHas('files', [
            'name' => 'testfile.txt',
            'size' => 102400,
            'extension' => 'txt',
        ]);

        Storage::disk('local')->assertExists('uploads/testfile.txt');
    }

    public function test_list_upload()
    {
        $response = $this->get('api/files');
        $response->assertStatus(200);
        $response->assertJsonIsArray();
    }
}

