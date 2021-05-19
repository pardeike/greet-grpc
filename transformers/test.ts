import ts from 'typescript'
import { readFileSync } from 'fs'
import conductor from 'service-conductor'

export function printRecursiveFrom(node: ts.Node, indentLevel: number, sourceFile: ts.SourceFile) {
	const indentation = '-'.repeat(indentLevel)
	const syntaxKind = ts.SyntaxKind[node.kind]
	// const nodeText = node.getText(sourceFile)
	console.log(`${indentation}${syntaxKind}`) //: ${nodeText}`);
	node.forEachChild((child) => printRecursiveFrom(child, indentLevel + 1, sourceFile))
}

function logNodesTranformer(context: ts.TransformationContext): ts.Transformer<ts.SourceFile> {
	const f = context.factory
	function transform(sourceFile: ts.SourceFile): ts.SourceFile {
		const visit = (node: ts.Node): ts.VisitResult<ts.Node> => {
			console.log(`METHOD: ${ts.SyntaxKind[node.kind]} ${node.getText(sourceFile)}`)
			return ts.visitEachChild(node, (child) => visit(child), context)
		}
		return ts.visitNode(sourceFile, visit)
	}
	return transform
}

const source = readFileSync('src/client/greet.ts').toString()
const result = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.CommonJS },
	transformers: { before: [conductor.transformer] },
})
//console.log(result.outputText)