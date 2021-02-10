/* eslint-env mocha */
/* global proclaim sinon */
import * as fixtures from './helpers/fixtures';
import LeeTestComponent from '../../main';

describe("LeeTestComponent", () => {
	it('is defined', () => {
		proclaim.equal(typeof LeeTestComponent, 'function');
	});

	it('has a static init method', () => {
		proclaim.equal(typeof LeeTestComponent.init, 'function');
	});

	it("should autoinitialize", (done) => {
		const initSpy = sinon.spy(LeeTestComponent, 'init');
		document.dispatchEvent(new CustomEvent('o.DOMContentLoaded'));
		setTimeout(function(){
			proclaim.equal(initSpy.called, true);
			initSpy.restore();
			done();
		}, 100);
	});

	it("should not autoinitialize when the event is not dispached", () => {
		const initSpy = sinon.spy(LeeTestComponent, 'init');
		proclaim.equal(initSpy.called, false);
	});

	describe("should create a new o-lee-test-component", () => {

		beforeEach(() => {
			fixtures.htmlCode();
		});

		afterEach(() => {
			fixtures.reset();
		});

		it("component array when initialized", () => {
			const boilerplate = LeeTestComponent.init();
			proclaim.equal(boilerplate instanceof Array, true);
			proclaim.equal(boilerplate[0] instanceof LeeTestComponent, true);
		});

		it("single component when initialized with a root element", () => {
			const boilerplate = LeeTestComponent.init('#element');
			proclaim.equal(boilerplate instanceof LeeTestComponent, true);
		});
	});
});