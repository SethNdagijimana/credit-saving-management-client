import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Credit Jambo Client API",
      version: "1.0.0",
      description: "API documentation for Credit Jambo Client backend ",
      contact: {
        name: "Credit Jambo Ltd",
        email: "sethreas@gmail.com"
      }
    },
    servers: [
      {
        url: "http://localhost:5002/api",
        description: "Local server"
      }
    ]
  },

  apis: ["./src/routes/*.js"]
}

export const swaggerSpec = swaggerJSDoc(options)

export const swaggerDocs = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  console.log("✅ Swagger docs available at: http://localhost:5002/api-docs")
}
