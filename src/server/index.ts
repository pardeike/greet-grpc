import * as grpc from '@grpc/grpc-js'
import { GreetingService } from '../proto/hello_grpc_pb'
import { GreetingServer } from './greeting'

function serve(): void {
	const server = new grpc.Server()
	// @ts-ignore
	server.addService(GreetingService, new GreetingServer())
	server.bindAsync(`localhost:${process.env.PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
		if (err) {
			throw err
		}
		console.log(`Listening on ${port}`)
		server.start()
	})
}

export default {
	command: 'serve',
	describe: 'Start the gRPC server',
	builder: {},
	handler: serve
}
