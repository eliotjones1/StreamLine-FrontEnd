import { Spinner } from '@material-tailwind/react';

export default function QueryError() {
	return (
		<div className="flex h-full w-full rounded-lg items-center justify-center p-10">
			<Spinner className="h-12 w-12" color="blue" />
		</div>
	);
}
