import { FC, ReactNode, useCallback, useState } from 'react';
import IAppContext, { IAppData } from '../../types/IAppContext';
import AppContext from './context';

export interface AppProviderOptions {
  children: (values: IAppContext) => ReactNode;
}

const AppProvider: FC<AppProviderOptions> = ({ children }) => {
  const searchParams = new URLSearchParams(window.location.search);
  const fields = searchParams.get('fields')?.trim() || '';
  const [data, setData] = useState<IAppData>({
    html: searchParams.get('html') || '',
    fields:
      typeof fields === 'string' && fields.length > 0 ? JSON.parse(fields) : [],
    viewerMode: searchParams.get('viewerMode') === 'true',
  });

  const generateLink = useCallback(
    (viewerMode: boolean): string => {
      const { html, fields } = data;
      const searchParams = new URLSearchParams();
      searchParams.set('html', html);
      searchParams.set('fields', JSON.stringify(fields));
      searchParams.set('viewerMode', viewerMode ? 'true' : 'false');
      return `${window.location.origin}/?${searchParams.toString()}`;
    },
    [data]
  );

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        generateLink,
      }}
    >
      <AppContext.Consumer>{children}</AppContext.Consumer>
    </AppContext.Provider>
  );
};

export default AppProvider;
