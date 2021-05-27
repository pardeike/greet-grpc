import ts from 'typescript'
import conductor from 'service-conductor'

export default (_: ts.Program) => {
	return (context: ts.TransformationContext) => {
		return conductor.transformer(context)
	}
}
