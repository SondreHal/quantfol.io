import axios from 'axios';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import React, { useEffect, useState } from 'react';

Highcharts.setOptions({
	lang: {
		months: [
			'January',
			'February',
			'Mars',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		weekdays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
		rangeSelectorZoom: '',
	},
	accessibility: { enabled: false },
});

const LandingPage = () => {
	const [stockOptions, setStockOptions] = useState({
		boost: {
			useGPUTranslations: true,
		},

		chart: {
			backgroundColor: 'rgb(250, 250, 250)',
			zoomType: 'x',
		},

		date: {
			dateFormat: 'dd/mm/YYYY',
		},

		rangeSelector: {
			buttons: [
				{
					type: 'year',
					count: 1,
					text: '1y',
					title: 'View 1 year',
				},
				{
					type: 'year',
					count: 5,
					text: '5y',
					title: 'View 5 years',
				},
				{
					type: 'all',
					text: 'All',
					title: 'View all',
				},
			],
			selected: 0, //all
		},

		tooltip: {
			valueDecimals: 2,
		},

		xAxis: {
			title: {
				text: 'Time',
			},
			type: 'datetime',
		},

		yAxis: {
			labels: {
				// eslint-disable-next-line no-template-curly-in-string
				format: '${text} USD',
			},
			title: {
				text: 'Stock value',
			},
		},
	});
	let stockArray = [];

	useEffect(() => {
		axios
			.get('https://stockdata.test.quantfolio.dev/ticker')
			.then((response) => {
				response.data.tickers.forEach((e) => {
					axios
						.get(`https://stockdata.test.quantfolio.dev/ticker/${e}`)
						.then((response) => {
							const stockValues = response.data.values
								.map((values) => {
									return [Date.parse(values.datetime), parseFloat(values.close)];
								})
								.reverse();
							stockArray.push({ name: `${response.data.meta.symbol}`, data: stockValues });
						})
						.then(() => {
							setStockOptions({
								...stockOptions,
								series: stockArray,
							});
						});
				});
			})
			.catch((error) => console.error(error));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<HighchartsReact
				highcharts={Highcharts}
				options={stockOptions}
				constructorType={'stockChart'}
			/>
		</>
	);
};

export default LandingPage;
