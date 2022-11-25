import './App.css';
import LOGO from './assets/images/quantfolio-logo.png';
import LandingPage from './LandingPage';

function App() {
	return (
		<div className='App'>
			<header>
				<img
					src={LOGO}
					alt='quantfolio logo'
				/>
			</header>
			<main>
				<LandingPage />
			</main>
		</div>
	);
}

export default App;
