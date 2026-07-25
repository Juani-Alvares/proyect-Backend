import request from "supertest";
import app from "../src/app.js";
import mongoose from "mongoose";

let adoptionId;

describe("Adoption Router", () => {

    test("GET /api/v1/adoptions debe responder 200", async () => {

        const response = await request(app)
            .get("/api/v1/adoptions");

        expect(response.statusCode).toBe(200);

        expect(response.body.status).toBe("success");

        expect(Array.isArray(response.body.payload)).toBe(true);

    });

    test("POST /api/v1/adoptions debe crear una adopción", async () => {

    const adoption = {
        user: "Juan Alvares",
        pet: "Firulais"
    };

    const response = await request(app)
        .post("/api/v1/adoptions")
        .send(adoption);

    expect(response.statusCode).toBe(201);
    expect(response.body.status).toBe("success");
    expect(response.body.payload).toHaveProperty("_id");

    adoptionId = response.body.payload._id;

});

test("GET /api/v1/adoptions/:id debe devolver una adopción", async () => {

    const response = await request(app)
        .get(`/api/v1/adoptions/${adoptionId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.payload).toHaveProperty("_id");

});

test("PUT /api/v1/adoptions/:id debe actualizar una adopción", async () => {

    const updatedAdoption = {
        user: "Juan Alvarez",
        pet: "Firulais",
        status: "approved"
    };

    const response = await request(app)
        .put(`/api/v1/adoptions/${adoptionId}`)
        .send(updatedAdoption);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.payload.status).toBe("approved");

});

test("DELETE /api/v1/adoptions/:id debe eliminar una adopción", async () => {

    const response = await request(app)
        .delete(`/api/v1/adoptions/${adoptionId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("success");
    expect(response.body.message).toBe("Adoption deleted");

});

test("GET /api/v1/adoptions/:id debe responder 404 si la adopción no existe", async () => {

    const fakeId = "64b7d8f9a0b1c2d3e4f5a6b7";

    const response = await request(app)
        .get(`/api/v1/adoptions/${fakeId}`);

    expect(response.statusCode).toBe(404);
    expect(response.body.status).toBe("error");

});

});
afterAll(async () => {
    await mongoose.connection.close();
});
