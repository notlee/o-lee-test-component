class LeeTestComponent {
	/**
	 * Class constructor.
	 * @param {HTMLElement} [leeTestComponentEl] - The component element in the DOM
	 * @param {Object} [options={}] - An options object for configuring the component
	 */
	constructor (leeTestComponentEl, options) {
		this.leeTestComponentEl = leeTestComponentEl;
		this.options = Object.assign({}, {
		}, options || LeeTestComponent.getDataAttributes(leeTestComponentEl));
	}
	/**
	 * Get the data attributes from the LeeTestComponentElement. If the element is being set up
	 * declaratively, this method is used to extract the data attributes from the DOM.
	 * @param {HTMLElement} leeTestComponentEl - The component element in the DOM
	 * @returns {Object} An options object which can be used for configuring the component
	 */
	static getDataAttributes (leeTestComponentEl) {
		if (!(leeTestComponentEl instanceof HTMLElement)) {
			return {};
		}
		return Object.keys(leeTestComponentEl.dataset).reduce((options, key) => {
			// Ignore data-o-component
			if (key === 'oComponent') {
				return options;
			}
			// Build a concise key and get the option value
			const shortKey = key.replace(/^oLeeTestComponent(\w)(\w+)$/, (m, m1, m2) => m1.toLowerCase() + m2);
			const value = leeTestComponentEl.dataset[key];
			// Try parsing the value as JSON, otherwise just set it as a string
			try {
				options[shortKey] = JSON.parse(value.replace(/'/g, '"'));
			} catch (error) {
				options[shortKey] = value;
			}
			return options;
		}, {});
	}
	/**
	 * Initialise o-lee-test-component component/s.
	 * @param {(HTMLElement|String)} rootElement - The root element to intialise the component in, or a CSS selector for the root element
	 * @param {Object} [options={}] - An options object for configuring the component
	 * @returns {LeeTestComponent|LeeTestComponent[]} The newly constructed LeeTestComponent components
	 */
	static init (rootElement, options) {
		if (!rootElement) {
			rootElement = document.body;
		}
		if (!(rootElement instanceof HTMLElement)) {
			rootElement = document.querySelector(rootElement);
		}
		if (rootElement instanceof HTMLElement && rootElement.matches('[data-o-component=o-lee-test-component]')) {
			return new LeeTestComponent(rootElement, options);
		}
		return Array.from(rootElement.querySelectorAll('[data-o-component="o-lee-test-component"]'), rootEl => new LeeTestComponent(rootEl, options));
	}
}

export default LeeTestComponent;
