import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import { MongoConnector } from "./mongo-connector";
import cookieParser from "cookie-parser";

import { authRouter, bookRouter, deepbrainRouter } from "./routes";
import swaggerUi = require("swagger-ui-express");
// import swaggerFile from "./swagger/swagger.json";
import fs = require("fs");

export class MainServer {
  private app: any;

  constructor() {
    dotenv.config();
    this.app = express();
  }

  /* Swagger files start */
  private swaggerFile: any = process.cwd() + "/src/swagger/swagger.json";
  private swaggerData: any = fs.readFileSync(this.swaggerFile, "utf8");
  private customCss: any = fs.readFileSync(
    process.cwd() + "/src/swagger/swagger.css",
    "utf8"
  );
  private swaggerDocument = JSON.parse(this.swaggerData);

  async start(): Promise<void> {
    const mongoConnector = new MongoConnector();
    await mongoConnector.connect();

    this.app.use("/uploads", express.static("uploads"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.app.use(cookieParser());

    /**
     * Router 설정
     */
    this.app.use("/api/auth", authRouter);
    this.app.use("/api/book", bookRouter);
    this.app.use("/api/deepbrain", deepbrainRouter);

    /**
     * Swagger 설정
     */
    // swagger docs
    // this.app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(this.swaggerDocument, null, null, this.customCss));
    this.app.use(
      "/api/docs",
      swaggerUi.serve,
      swaggerUi.setup(this.swaggerDocument, null, null, null)
    );

    /**
     * Server 연결
     */
    const PORT = process.env.PORT || 4000;
    this.app.listen(PORT, () => {
      console.log(`server is listening at ${PORT}`);
    });
  }
}
