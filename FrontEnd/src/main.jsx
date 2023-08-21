import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import { BrowserRouter } from 'react-router-dom';
import CommonContextWrapper from 'src/modules/common/contexts';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				<CommonContextWrapper>
					<ThemeProvider>
						<App />
						<ReactQueryDevtools />
					</ThemeProvider>
				</CommonContextWrapper>
			</QueryClientProvider>
		</BrowserRouter>
	</React.StrictMode>,
);
