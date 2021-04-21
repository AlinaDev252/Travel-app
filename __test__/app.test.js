import { handleEvent } from "../src/client/js/app";
import { handleSubmitData } from "../src/client/js/app";
import { calcDaysBetweenDates } from "../src/client/js/app";
import { mockAxios } from "axios";
let Axios;
let MockAdapter;

describe("Testing if the function is not null", () => {
	test("It should return true", () => {
		expect(handleEvent).not.toBeNull;
	});
});

describe("Testing if the function is not null", () => {
	test("It should return true", () => {
		expect(handleSubmitData).not.toBeNull;
	});
});


describe("Testing date input results", () => {
	test("Testing the days between two equal dates", () => {
		const firstDate = new Date();
		const secondDate = firstDate;
		expect(calcDaysBetweenDates(firstDate, secondDate)).toStrictEqual(0);
	});
});

// Mock event.preventDefault() with Jest

describe("Mocking preventDefault", () => {
	test("It should mock preventDefault", () => {
		const event = { preventDefault: () => {} };

		// runs before each test starts running
		beforeEach(() => {
			mockAxios = new MockAdapter(Axios);
			jest.spyOn(event, "preventDefault");
		});

		// runs after each test has finished
		afterEach(() => {
			mockAxios.reset();
		});
	});
});