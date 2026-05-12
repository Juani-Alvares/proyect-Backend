import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions = {
    definition: {
        openapi: "3.0.1",

        info: {
            title: "Backend API",
            version: "1.0.0",
            description: "API ecommerce backend"
        },

        components: {

            securitySchemes: {

                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }

            }

        },

        security: [
            {
                bearerAuth: []
            }
        ]

    },

    apis: ["./src/routes/*.js"]
};

const specs = swaggerJSDoc(swaggerOptions);

export default specs;