const arr = [
	{
		id: 1,
		name: '1'
	},
	{
		id: 2,
		name: '2'
	},
	{
		id: 3,
		name: '3'
	},
]

const el = arr.find((element) => element.id === 1)
el.name = '3'
console.log(arr);