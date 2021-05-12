import client from './client'
import { GreetRequest } from '../proto/hello_pb'

function greet(user: string): Promise<void> {
	console.log(`Request: ${user}`)
	const request = new GreetRequest()
	request.setName(user)
	return new Promise<void>((resolve, reject) => {
		client.greet(request, (error, response) => {
			if (error) {
				console.log(`Error: ${error}`)
				reject
				return
			}
			console.log(`Response: ${response.getText()}`)
		})
	})
}

export default {
	command: 'greet',
	describe: 'Returns a greeting for a name',
	builder: {
		user: {
			demand: true,
			string: true,
		},
	},
	handler: async (argv): Promise<void> => {
		await greet(argv.user)
	},
}