import * as path from 'path';
import * as fs from 'fs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app) {
  const options = new DocumentBuilder()
    .setTitle('Fchat api')
    .setDescription(
      ' chat api ',
    )
    .setVersion('1.0.0')
    //.addBearerAuth() // Add bearer token authentication
    .build();

  const document = SwaggerModule.createDocument(app, options);
  const swaggerPath = path.resolve(__dirname, 'swagger.json');
  fs.writeFileSync(swaggerPath, JSON.stringify(document, null, 2));

  SwaggerModule.setup('api-docs', app, document);
}