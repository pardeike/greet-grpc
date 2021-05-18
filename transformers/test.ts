import ts from 'typescript';

let source = `
import * as grpc from '@grpc/grpc-js'
import { sendUnaryData } from '@grpc/grpc-js/build/src/server-call'
import { GreetRequest, GreetResponse } from '../proto/hello_pb'
import { IGreetingServer } from '../proto/hello_grpc_pb'

export class GreetingServer implements IGreetingServer {

	[name: string]: grpc.UntypedHandleCall

	greet(call: grpc.ServerUnaryCall<GreetRequest, GreetResponse>, callback: sendUnaryData<GreetResponse>): void {
		const response = new GreetResponse()
		response.setText("Hello")
		callback(null, response)
	}
}
`;

//const additionalSource: ts.SourceFile = ts.createSourceFile(
//    'mylogger.js',
//    'function foo() {\n\tconsole.log("foo");\n\tconsole.log("bar");\n}',
//    ts.ScriptTarget.ES5,
//    false,
//    ts.ScriptKind.JS,
//);
//function printRecursiveFrom(node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile) {
//    const indentation = '-'.repeat(indentLevel);
//    const syntaxKind = ts.SyntaxKind[node.kind];
//    const nodeText = node.getText(sourceFile);
//    console.log(`${indentation}${syntaxKind}`); //: ${nodeText}`);
//    node.forEachChild((child) => printRecursiveFrom(child, indentLevel + 1, sourceFile));
//}
//printRecursiveFrom(additionalSource, 4, additionalSource);
//process.exit(0);

let result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
    transformers: { before: [simpleTransformer()] },
});
console.log(result.outputText);

function logHello(factory: ts.NodeFactory) {
    return factory.createCallExpression(
        factory.createPropertyAccessExpression(factory.createIdentifier('console'), factory.createIdentifier('log')),
        undefined,
        [factory.createStringLiteral('hello')],
    );
}

function setBody(factory: ts.NodeFactory, node: ts.MethodDeclaration, body: ts.Block): ts.MethodDeclaration {
    return factory.updateMethodDeclaration(
        node,
        node.decorators,
        node.modifiers,
        node.asteriskToken,
        node.name,
        node.questionToken,
        node.typeParameters,
        node.parameters,
        node.type,
        body,
    );
}

function simpleTransformer<T extends ts.Node>(): ts.TransformerFactory<T> {
    return (context) => {
        const visit: ts.Visitor = (node) => {
            if (ts.isMethodDeclaration(node)) {
                const body = context.factory.createBlock(
                    context.factory.createNodeArray([].concat(logHello(context.factory), node.body.statements), false),
                );
                return setBody(context.factory, node, body);
            }
            return ts.visitEachChild(node, (child) => visit(child), context);
        };
        return (node) => ts.visitNode(node, visit);
    };
}
