import { Injectable } from '@nestjs/common'
import { add } from '@parkingspace/sample-lib'

@Injectable()
export class AppService {
  getHello(): string {
    return `Hello World! ${add(2, 3)}`
  }
}
