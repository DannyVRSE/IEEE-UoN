import supertest from "supertest";//supertest module
//import app object
import server from "../main.js";
const requestWithSupertest = supertest(server)

//test for GET "/auth-status" returns auth details
//status code, 200, json response

describe('GET /auth-status', () => {
    it('should return status code 200 and json response', async () => {
        const response = await requestWithSupertest.get("/auth-status")
        expect(response.status).toEqual(200)
        expect(res.type).toEqual('application/json')
    })
})