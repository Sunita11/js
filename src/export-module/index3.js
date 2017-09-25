import React from 'react'
import ReactDom from 'react-dom'
import text from './title.json'
import '../../src/sass/hello.scss'
import '../../src/sass/goodbye.css'

export const hello = (
	<h1
		id="title"
		className = "hello"
	>
	{text.a}
	</h1>
)

export const goodbye = (
	<h1
		id="title2"
		className = "goodbye"
	>
	{text.b}
	</h1>
)