import { useBusiness } from '/src/modules/business/hooks';
import { useQuery } from '@tanstack/react-query';
import { QueryError, QueryLoading } from 'src/modules/error/components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Content() {
	const { fetchAllServices } = useBusiness();
	const [searchTerm, setSearchTerm] = useState('');

	const nav = useNavigate();

	const { status, data } = useQuery({
		queryKey: ['business', 'supported services'],
		queryFn: async () => {
            return await fetchAllServices();
		},
	});

	const columns = data ? Object.keys(data) : [];

	if (status === 'loading') return <QueryLoading />;
	if (status === 'error') return <QueryError />;

	const generateDataArray = (data, columns) => {
		if (data && columns.length > 0) {
			const rowCount = Object.keys(data[columns[0]]).length;
			return Array.from({ length: rowCount }, (_, rowIndex) => {
				return columns.reduce((acc, column) => {
					acc[column] = data[column][rowIndex];
					return acc;
				}, {});
			});
		}
		return [];
	};

	const dataArray = generateDataArray(data, columns);

	const filterData = (dataArray, columns, searchTerm) => {
		return dataArray.filter((row) =>
			columns.some((column) =>
				String(row[column]).toLowerCase().includes(searchTerm.toLowerCase()),
			),
		);
	};

	const filteredData = filterData(dataArray, columns, searchTerm);

	return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
		<p style={{ textAlign: 'center', paddingTop: '20px', paddingBottom: '40px', fontSize: '1.5em'}}>
			{/* Your paragraph text here */}
			Explore our vast collection of streaming services. Please note that we try to keep this table as up to date as possible.
			If you notice any errors, please click <span onClick={() => nav('/support')} style={{ color: 'blue', cursor: 'pointer' }}>here</span> to let us know.
			All prices in USD.

		</p>
        <div style={{ marginBottom: '10px' }}>
            <span style={{ marginRight: '10px', fontWeight: 'bold' }}>Filter for services here:</span>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    padding: '8px',
                    border: '2px solid #555', // Darker border
                    borderRadius: '8px', // Softer edges
                    outline: 'none'
                }}
            />
        </div>
        <div style={{ maxHeight: '400px', overflow: 'auto', width: '100%' }}>
            <table style={{ borderCollapse: 'collapse', width: '100%', borderRadius: '10px' }}>
                <thead>
                    <tr>
                        {columns.filter(column => column !== 'logo_path').map((column, index) => (
                            <th key={index} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: '#f4f4f4' }}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.filter(column => column !== 'logo_path').map((column, colIndex) => (
                                <td key={colIndex} style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center', backgroundColor: rowIndex % 2 === 0 ? '#f9f9f9' : 'none' }}>
                                    {column === 'Name' ? (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src={`https://image.tmdb.org/t/p/w500/${row['logo_path']}`}
												alt={row[column]}
												style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover', marginRight: '10px' }}
											/>
											{row[column]}
										</div>
										) : column === 'Link' ? (
											<a href={row[column]} target="_blank" rel="noopener noreferrer">{row[column]}</a>
											) : (
												row[column]
												)}
								</td>
								))}
						</tr>
						))}
				</tbody>
			</table>
		</div>
	</div>
	);

}


