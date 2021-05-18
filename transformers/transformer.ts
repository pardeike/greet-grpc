import ts from 'typescript';

function debug(node: ts.Node, sourceFile: ts.SourceFile) {
    const printer = ts.createPrinter();
    console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile));
}

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

export default (program: ts.Program) => {
    return (ctx: ts.TransformationContext) => {
        return (sourceFile: ts.SourceFile) => {
            function visitor(node: ts.Node): ts.Node {
                const factory = ctx.factory;
                if (ts.isMethodDeclaration(node)) {
                    node = setBody(
                        factory,
                        node,
                        factory.createBlock(
                            factory.createNodeArray([].concat(logHello(factory), node.body.statements), false),
                        ),
                    );
                    debug(node, sourceFile);
                }
                return ts.visitEachChild(node, visitor, ctx);
            }
            return ts.visitEachChild(sourceFile, visitor, ctx);
        };
    };
};
