import oLeeTestComponent from './src/js/lee-test-component';

console.log('Hello there!');

const constructAll = function () {
	oLeeTestComponent.init();
	document.removeEventListener('o.DOMContentLoaded', constructAll);
};
document.addEventListener('o.DOMContentLoaded', constructAll);
export default oLeeTestComponent;
