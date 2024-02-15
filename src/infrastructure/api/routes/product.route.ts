import express, { Request, Response } from "express";

import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

import {InputCreateProductDto} from "../../../usecase/product/create/create.product.dto";
import { CreateProductUseCase } from "../../../usecase/product/create/create.product.usecase";
import { ListProductsUseCase } from "../../../usecase/product/list/list.product.usecase";


export const productRoute = express.Router();

productRoute.post("/", async (req: Request, res: Response) => {
    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);
    console.log(req.body.name);

    try {
        const productDto: InputCreateProductDto = {
            name: req.body.name,
            price: req.body.price,
        };

        const output = await useCase.execute(productDto);
        res.send(output);

    } catch (err) {
        res.status(500).send(err);
    }
});

productRoute.get("/", async (request: Request, response: Response) => {
    const usecase = new ListProductsUseCase(new ProductRepository());

    try {
        const output = await usecase.execute({});

        response.status(200).send(output);
    } catch (error) {
        response.status(500).send(error);
    }
});
