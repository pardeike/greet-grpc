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

const source = readFileSync('src/server/greeting.ts').toString()
const result = ts.transpileModule(source, {
	compilerOptions: { module: ts.ModuleKind.CommonJS },
	transformers: { before: [conductor.transformer] },
})
console.log(result.outputText)