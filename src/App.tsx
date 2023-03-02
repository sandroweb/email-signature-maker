import Create from './pages/Create';
import Viewer from './pages/Viewer';
import AppProvider from './providers/app';

export interface IField {
  findableTerm: string;
  replaceableTerm: string;
  multiple: boolean;
}

export interface IAppData {
  html: string;
  fields: IField[];
}

function App() {
  return (
    <main>
      <AppProvider>
        {({ data }) => {
          return data.viewerMode ? <Viewer /> : <Create />;
        }}
      </AppProvider>
    </main>
  );
}

export default App;
