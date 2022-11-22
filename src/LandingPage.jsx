import axios from 'axios';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import React, { useEffect } from 'react';

const LandingPage = () => {
	useEffect(() => {
		axios
			.get('https://stockdata.test.quantfolio.dev/ticker/AAPL:NASDAQ')
			.then((response) => {
				const stockData = response.data.values;
				const closeStockData = stockData.map((value) => parseFloat(value.close));
				return closeStockData;
			})
			.catch((error) => console.error('Something went wrong'));
	}, []);

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={closeStockData}
			/>
		</>
	);
};

export default LandingPage;
