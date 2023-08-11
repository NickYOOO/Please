import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './shared/Router';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
};

export default App;
