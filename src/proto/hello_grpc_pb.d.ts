// package: hello
// file: hello.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import {handleClientStreamingCall} from "@grpc/grpc-js/build/src/server-call";
import * as hello_pb from "./hello_pb";

interface IGreetingService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    greet: IGreetingService_IGreet;
}

interface IGreetingService_IGreet extends grpc.MethodDefinition<hello_pb.GreetRequest, hello_pb.GreetResponse> {
    path: "/hello.Greeting/Greet";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<hello_pb.GreetRequest>;
    requestDeserialize: grpc.deserialize<hello_pb.GreetRequest>;
    responseSerialize: grpc.serialize<hello_pb.GreetResponse>;
    responseDeserialize: grpc.deserialize<hello_pb.GreetResponse>;
}

export const GreetingService: IGreetingService;

export interface IGreetingServer extends grpc.UntypedServiceImplementation {
    greet: grpc.handleUnaryCall<hello_pb.GreetRequest, hello_pb.GreetResponse>;
}

export interface IGreetingClient {
    greet(request: hello_pb.GreetRequest, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    greet(request: hello_pb.GreetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    greet(request: hello_pb.GreetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
}

export class GreetingClient extends grpc.Client implements IGreetingClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public greet(request: hello_pb.GreetRequest, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    public greet(request: hello_pb.GreetRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
    public greet(request: hello_pb.GreetRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: hello_pb.GreetResponse) => void): grpc.ClientUnaryCall;
}
