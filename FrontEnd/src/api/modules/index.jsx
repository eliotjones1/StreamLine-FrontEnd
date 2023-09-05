import PropTypes from 'prop-types';
import AccountProvider from './account';
import AuthProvider from './auth';
import BusinessProvider from './business';
import MediaProvider from './media';

export default function GlobalContextWrapper({ children }) {
	return (
		<AuthProvider>
			<AccountProvider>
				<BusinessProvider>
					<MediaProvider>{children}</MediaProvider>
				</BusinessProvider>
			</AccountProvider>
		</AuthProvider>
	);
}

GlobalContextWrapper.propTypes = {
	children: PropTypes.node.isRequired,
};
