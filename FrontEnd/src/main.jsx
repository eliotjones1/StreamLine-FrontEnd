import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@material-tailwind/react';
import { HashRouter } from 'react-router-dom';
import GlobalContextWrapper from 'src/api/modules';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<HashRouter>
			<QueryClientProvider client={queryClient}>
				<GlobalContextWrapper>
					<ThemeProvider>
						<App />
						<ToastContainer />
					</ThemeProvider>
				</GlobalContextWrapper>
			</QueryClientProvider>
		</HashRouter>
	</React.StrictMode>,
);
