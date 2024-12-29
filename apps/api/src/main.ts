import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.enableCors()

  const config = new DocumentBuilder()
    .setTitle('parking_space | Santosh Kumar Payasi')
    .setDescription(
      `The Parking Space API.
      <h1>Looking for GraphQL API</h1>
      Go to <a href="/graphql" target="_blank">/graphql</a>
      Or you can go to
      <a href="https://studio.apollographql.com/graph/parking-space/variant/current/explorer" target="_blank">GraphQL Studio</a>
    `,
    )
    .setVersion('0.1')
    .addBearerAuth()
    .build()

  const document = SwaggerModule.createDocument(app, config)

  SwaggerModule.setup('/', app, document)

  await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
