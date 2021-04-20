const app = require("../src/server/index");
const supertest = require("supertest");
const request = supertest(app);

it("Posts the data regarding destination and trip duration", async (done) => {
	const response = await request.post("/sendFormData");
	expect(response.status).toBe(200);
	done();
});

it("Gets the data after the last fetch", async (done) => {
	const response = await request.get("/getData");
	expect(response.status).toBe(200);
	done();
});
