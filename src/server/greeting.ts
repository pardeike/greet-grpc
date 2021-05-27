import * as grpc from '@grpc/grpc-js'
import { sendUnaryData } from '@grpc/grpc-js/build/src/server-call'
import { GreetRequest, GreetResponse } from '../proto/hello_pb'
import { IGreetingServer } from '../proto/hello_grpc_pb'

export class GreetingServer implements IGreetingServer {
	[name: string]: grpc.UntypedHandleCall

	greet(call: grpc.ServerUnaryCall<GreetRequest, GreetResponse>, callback: sendUnaryData<GreetResponse>): void {
		const response = new GreetResponse()
		response.setText(`Hello ${call.request.getName()}`)
		callback(null, response)
	}
}
