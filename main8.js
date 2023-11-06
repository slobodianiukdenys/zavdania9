const menu = {
	rolls: [
		{ name: 'California Roll', price: 400, weight: '440g' },
		{ name: 'Сalifornia with salmon', price: 500, weight: '420g' },
		{ name: 'Philadelphia', price: 550, weight: '480g' },
		{ name: 'Philadelphia with avocado', price: 600, weight: '450g' },
	],
	drinks: [
		{ name: 'Cola', price: 40, weight: '500ml' },
		{ name: 'Fanta', price: 40, weight: '500ml' },
		{ name: 'Jivchik', price: 30, weight: '500ml' },
	],
}

const order = {
	items: [],
	total: 0,
	customerName: '',
	deliveryAddress: '',
	customerPhone: '',
}

function displayMenu() {
	console.log('Меню:')
	console.log('Роли:')
	menu.rolls.forEach((roll, index) => {
		console.log(`${index + 1}. ${roll.name} - ${roll.price}UAH (${roll.weight})`)
	})

	console.log('Напої:')
	menu.drinks.forEach((drink, index) => {
		console.log(
			`${menu.rolls.length + index + 1}. ${drink.name} - ${drink.price}UAH (${drink.weight})`
		)
	})
}

function addToOrder(itemIndex, quantity) {
	const item =
		itemIndex <= menu.rolls.length
			? menu.rolls[itemIndex - 1]
			: menu.drinks[itemIndex - menu.rolls.length - 1]

	if (item) {
		order.items.push({ name: item.name, price: item.price, quantity })
		order.total += item.price * quantity
		console.log(`Додано ${quantity}x ${item.name} до вашого замовлення.`)
	} else {
		console.log('Недійсний номер страви')
	}
}

function finalizeOrder() {
	console.log('Замовлення:')
	order.items.forEach(item => {
		console.log(
			`${item.name} x${item.quantity} - ${item.price * item.quantity}UAH`
		)
	})

	console.log('Інформація про замовника:')
	console.log(`Ім'я покупця: ${order.customerName}`)
	console.log(`Адреса доставки: ${order.deliveryAddress}`)
	console.log(`Номер телефону: ${order.customerPhone}`)
	console.log(`Загальна сума: ${order.total}UAH`)
	console.log(`Дякуємо за ваше замовлення! В найближчий час з вами зв'яжеться доставщик`)
}

function startOrdering() {
	const readline = require('readline').createInterface({
		input: process.stdin,
		output: process.stdout,
	})

	readline.question(`Введіть ім'я покупця: `, customerName => {
		order.customerName = customerName

		readline.question('Введіть адресу доставки: ', deliveryAddress => {
			order.deliveryAddress = deliveryAddress

			readline.question('Введіть ваш номер телефону: ', customerPhone => {
				order.customerPhone = customerPhone

				displayMenu()

				function getOrder() {
					readline.question(
						'Виберіть номер страви або напою (0, щоб завершити замовлення): ',
						input => {
							const itemIndex = parseInt(input)

							if (itemIndex === 0) {
								readline.close()
								finalizeOrder()
							} else if (
								itemIndex >= 1 &&
								itemIndex <= menu.rolls.length + menu.drinks.length
							) {
								readline.question('Введіть кількість: ', quantity => {
									addToOrder(itemIndex, parseInt(quantity))
									getOrder()
								})
							} else {
								console.log('Недійсний номер страви або напою.' )
								getOrder()
							}
						}
					)
				}

				getOrder()
			})
		})
	})
}

startOrdering()
