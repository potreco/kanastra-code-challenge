export enum FileActionType {
  UPLOAD_FILE = 'UPLOAD_FILE',
  SET_LOADING = 'SET_LOADING',
  SET_FILE_LIST = 'SET_FILE_LIST',
  REFRESH_FILE_LIST = 'REFRESH_FILE_LIST',
}

type ReducerAction<T, P> = {
  type: T;
  payload?: Partial<P>;
};

export type FileContextState = {
  isLoading: boolean;
  file: File | null;
  fileList: File[];
};

export type FileAction = ReducerAction<FileActionType, FileContextState>;

type FileDispatch = (action: FileAction) => void;

export type FileContextType = {
  state: FileContextState;
  dispatch: FileDispatch;
};

export type FileProviderProps = { children: React.ReactNode };
