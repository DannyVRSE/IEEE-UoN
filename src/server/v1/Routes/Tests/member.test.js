import supertest from "supertest";
import server from "../../../main.js";

const requestWithSupertest = supertest(server);

describe ("GET /api/v1/members", () => {
    test("GET /api/v1/members", async () => {
        const response = await requestWithSupertest.get("/api/v1/members");
        expect(response.status).toEqual(401);
        expect(response.body).toEqual({ message: "Unauthorized access. Please login" });
    });
});