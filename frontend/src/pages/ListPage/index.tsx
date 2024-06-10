import FileList from '@/components/ui/FileList';
import { Link } from 'react-router-dom';

const ListPage: React.FC = () => {
  return (
    <>
      <h1 className="text-2xl font-bold my-4">List Page</h1>
      <FileList />
      <div className="mt-4">
        <Link to="/" className="p-2 bg-blue-500 text-white rounded">
          Back to Upload Page
        </Link>
      </div>
    </>
  );
};

export default ListPage;
