import { useFileContext } from '@/contexts/FileContext';
import FileService from '@/services/FileService';
import { FileActionType } from '@/types';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const FileUpload: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    dispatch,
    state: { isLoading },
  } = useFileContext();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      dispatch({
        type: FileActionType.SET_LOADING,
        payload: { isLoading: true },
      });

      await FileService.uploadFile(selectedFile);

      dispatch({
        type: FileActionType.UPLOAD_FILE,
        payload: { file: selectedFile },
      });
      dispatch({
        type: FileActionType.SET_LOADING,
        payload: { isLoading: false },
      });
      setSelectedFile(null);
    } catch (error) {
      setSelectedFile(null);
      setError('Failed to upload the file. Please try again later.');

      dispatch({
        type: FileActionType.SET_LOADING,
        payload: { isLoading: false },
      });
    }
  };

  return (
    <div className="p-4">
      <input
        type="file"
        onChange={handleFileChange}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel,text/csv"
      />

      {error && <p className="text-red-500">{error}</p>}

      {selectedFile && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">File Details:</h3>
          <p>
            <strong>Name:</strong> {selectedFile.name}
          </p>
          <p>
            <strong>Size:</strong> {(selectedFile.size / 1024).toFixed(2)} KB
          </p>
          <p>
            <strong>Type:</strong> {selectedFile.type}
          </p>

          <button
            onClick={handleUpload}
            className="rounded-lg bg-green-800 text-white px-4 py-2 border-none font-semibold"
            disabled={isLoading ? true : false}
          >
            {isLoading ? (
              <>
                <ArrowPathIcon className="animate-spin h-5 w-5 mr-3" />
                Processing...
              </>
            ) : (
              'Upload the file'
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
