import {
  FileAction,
  FileActionType,
  FileContextState,
  FileContextType,
  FileProviderProps,
} from '@/types';
import { createContext, useContext, useReducer } from 'react';

const FileContextInitialValues: FileContextState = {
  file: null,
  isLoading: false,
  fileList: [],
};

const FileContext = createContext<FileContextType | undefined>(undefined);

const FileReducer = (
  state: FileContextState,
  action: FileAction,
): FileContextState => {
  switch (action.type) {
    case FileActionType.UPLOAD_FILE:
      return { ...state, file: action.payload?.file || null };
    case FileActionType.SET_LOADING:
      return { ...state, isLoading: action.payload?.isLoading || false };
    case FileActionType.SET_FILE_LIST:
      return { ...state, fileList: action.payload?.fileList || [] };
    case FileActionType.REFRESH_FILE_LIST:
      return { ...state, fileList: action.payload?.fileList || [] };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

const FileProvider = ({ children }: FileProviderProps) => {
  const [state, dispatch] = useReducer(FileReducer, FileContextInitialValues);

  return (
    <FileContext.Provider value={{ state, dispatch }}>
      {children}
    </FileContext.Provider>
  );
};

const useFileContext = () => {
  const context = useContext(FileContext);
  if (context === undefined) {
    throw new Error('useFileContext must be used within a FileProvider');
  }
  return context;
};

export { FileProvider, useFileContext };
