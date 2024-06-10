import FileUpload from '@/components/ui/FileUpload';
import { Link } from 'react-router-dom';

const UploadPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">Upload Page</h1>

      <h2>
        Olá, me chamo Patrick Jean Meurer e esse é meu teste para a Kanastra :)
      </h2>

      <FileUpload />

      <div className="mt-4">
        <Link to="/list" className="p-2 bg-green-500 text-white rounded">
          Go to File List
        </Link>
      </div>
    </>
  );
};

export default UploadPage;
