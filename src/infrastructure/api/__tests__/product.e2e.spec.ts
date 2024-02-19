import { app, sequelize } from "../express";
import request from "supertest";
import {Sequelize} from "sequelize-typescript";
import {ProductModel} from "../../product/repository/sequelize/product.model";

describe("E2E test for product", () => {

    beforeEach(async () => {
        await sequelize.sync({ force: true });
    });

    afterAll(async () => {
        await sequelize.close();
    });

    it("should create a product", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "Shirt",
                         price: 100,
                  });

        expect(response.status).toBe(200);
        expect(response.body.name).toBe("Shirt");
        expect(response.body.price).toBe(100);
    });

    it("should not create a product when name is not provided", async () => {
        const response = await request(app)
            .post("/product")
            .send({ name: "", price: 100 });

        expect(response.status).toBe(500);
    });

    it("should list all products", async () => {
        await request(app).post("/product").send({ name: "Shirt", price: 100 });
        await request(app).post("/product").send({ name: "Hat", price: 30 });

        const response = await request(app).get("/product").send();
        const product1 = response.body.products[0];
        const product2 = response.body.products[1];

        expect(response.status).toEqual(200);
        expect(response.body.products.length).toEqual(2);

        expect(product1.name).toEqual("Shirt");
        expect(product2.name).toEqual("Hat");
    });
});