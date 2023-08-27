import { useNavigate } from 'react-router-dom';
import { FaceFrownIcon } from '@heroicons/react/24/outline';
import { Typography } from '@material-tailwind/react';

export default function QueryError() {
	const nav = useNavigate();
	return (
		<div className="flex flex-col h-full w-full rounded-lg items-center justify-center p-10">
			<FaceFrownIcon className="text-slate-800 h-32 w-32" />
			<Typography className="flex w-3/4 text-center">
				An internal server error has occured. Our staff is aware of the issue
				and working to resolve it in a timely manner. If the issue persists
				please contact support for assistance.
			</Typography>
			<button
				type="button"
				className="colored-sky-btn mt-4"
				onClick={() => nav('/support')}
			>
				Contact Support
			</button>
		</div>
	);
}
