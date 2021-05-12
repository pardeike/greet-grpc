// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var hello_pb = require('./hello_pb.js');

function serialize_hello_GreetRequest(arg) {
  if (!(arg instanceof hello_pb.GreetRequest)) {
    throw new Error('Expected argument of type hello.GreetRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_GreetRequest(buffer_arg) {
  return hello_pb.GreetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_hello_GreetResponse(arg) {
  if (!(arg instanceof hello_pb.GreetResponse)) {
    throw new Error('Expected argument of type hello.GreetResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_hello_GreetResponse(buffer_arg) {
  return hello_pb.GreetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var GreetingService = exports.GreetingService = {
  greet: {
    path: '/hello.Greeting/Greet',
    requestStream: false,
    responseStream: false,
    requestType: hello_pb.GreetRequest,
    responseType: hello_pb.GreetResponse,
    requestSerialize: serialize_hello_GreetRequest,
    requestDeserialize: deserialize_hello_GreetRequest,
    responseSerialize: serialize_hello_GreetResponse,
    responseDeserialize: deserialize_hello_GreetResponse,
  },
};

exports.GreetingClient = grpc.makeGenericClientConstructor(GreetingService);
