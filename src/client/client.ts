import * as grpc from '@grpc/grpc-js'
import { GreetingClient } from '../proto/hello_grpc_pb'

export default new GreetingClient(
	`localhost:${process.env.PORT}`,
	grpc.credentials.createInsecure(),
)