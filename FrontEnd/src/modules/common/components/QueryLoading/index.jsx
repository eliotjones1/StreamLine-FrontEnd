import { Spinner } from '@material-tailwind/react';

export default function QueryError() {
	return (
		<div className="flex h-full w-full bg-slate-50 rounded-lg items-center justify-center">
			<Spinner className="h-12 w-12" color="blue" />
		</div>
	);
}