import { useFileContext } from '@/contexts/FileContext';
import FileService from '@/services/FileService';
import { FileActionType } from '@/types';
import { useEffect, useState } from 'react';


const FileList: React.FC = () => {
  const { state, dispatch } = useFileContext();
  const { fileList } = state;
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileList = async () => {
      try {
        const files = await FileService.getFileList();
        dispatch({
          type: FileActionType.REFRESH_FILE_LIST,
          payload: { fileList: files },
        });
        setError(null);
      } catch (error) {
        setError('Failed to fetch file list. Please try again later.');
      }
    };

    fetchFileList();
  }, [dispatch]);

  return (
    <div className="p-4">
      <h2 className="text-lg font-bold">Uploaded Files</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul>
        {fileList.map((file, index: number) => (
          <li key={index}>{file.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;
