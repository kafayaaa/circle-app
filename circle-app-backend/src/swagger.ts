import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Application } from "express";

export const swaggerSetup = (app: Application) => {
  const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Circle API Documentation",
        version: "1.0.0",
        description: "Documentation for Circle App API",
      },
      servers: [
        {
          url: "http://localhost:3000/api/v1",
          description: "Local server",
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },

    apis: ["./src/routers/*.ts"],
  };

  const swaggerSpec = swaggerJsdoc(options);

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
