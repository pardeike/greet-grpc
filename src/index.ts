import yargs from 'yargs'
import serve from './server'
import greet from './client/greet'

yargs
	.command(serve)
	.command(greet)
	.help().argv