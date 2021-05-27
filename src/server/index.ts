import * as grpc from '@grpc/grpc-js'
import { GreetingService } from '../proto/hello_grpc_pb'
import { GreetingServer } from './greeting'

function ready(port: number): void {
	console.log(`Listening on ${port}`)
}

function serve(): void {
	const server = new grpc.Server()
	// @ts-ignore
	server.addService(GreetingService, new GreetingServer())
	server.bindAsync(`localhost:${process.env.PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
		if (err) {
			throw err
		}
		server.start()
		ready(port)
	})
}

export default {
	command: 'serve',
	describe: 'Start the gRPC server',
	builder: {},
	handler: serve
}
