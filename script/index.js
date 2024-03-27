const messageForm = document.querySelector('#add-message');
const emptyChatMessage = document.querySelector('#empty-chat');
const messagesContainer = document.querySelector('#messages-container');
//const delMessage = document.querySelector('#delMessage');

let notEmpty = false;

messageForm.addEventListener('submit', event => {
	event.preventDefault();
	const { username, usermessage } = getFormObject(messageForm);
	addMessage(username, usermessage, new Date());
	messageForm.reset();
});


function addMessage(name, message, date) {
	if (!notEmpty) {
		notEmpty = true;
		emptyChatMessage.style.display = 'none';

	}
	//Вот тут немного изменил код, чтобы не было лишних полей, поэтому передаю их generateElement
	//это тоже не совсем надо, так как они существуют но свою роль не выполняют
	// const btnCont = generateElement('div','btn-container','','');
	// const  delBtn = generateElement('button', 'delMessage', '','Удалить');
	// btnCont.appendChild(delBtn);
	// messagesContainer.appendChild(btnCont);
	//

	const newMessage = generateElement('div', 'message');
	const currentMonth = (date.getMonth() + 1 < 10 ? '0' : '') +
		(date.getMonth() + 1);

	const messageHeader = generateElement('div', 'message-header');	
	newMessage.appendChild(messageHeader);
	messageHeader.appendChild(generateElement(
		'h4',
		'message-title',
		'',
		name
	));
	messageHeader.appendChild(generateElement(
		'p',
		'message-date',
		'',
		`${date.getHours()}:${date.getMinutes()}, ${date.getDate()}.${currentMonth}.${date.getFullYear()}`
	));

	newMessage.appendChild(generateElement(
		'p',
		'message-text',
		'',
		message
	));

	//Тут попроще будет, создаю кнопку , отвечающую за delete
	const removeText = generateElement('button','delete','','delete');

	newMessage.appendChild(removeText);
	messagesContainer.appendChild(newMessage);

	removeText.addEventListener('click', e =>{
		newMessage.remove();
		if (messagesContainer.hasChildNodes()) {
			console.log(213)
			emptyChatMessage.style.display = 'block';
		}
	});//

	//messagesContainer.appendChild(newMessage);

	// у тебя тут проблема, delMessage  - нет такого id)
	// const delMessage = document.querySelector('#delMessage');
	// newMessage.appendChild(delMessage);
	// delMessage.addEventListener('click', ()=>{
	//вот тут тоже не правильно, он не берет эти элементы
	// const blocks = document.querySelectorAll('.message');
	// blocks[0].remove();

	
	// });
}

function getFormObject(form) {
	return Array.from(form.elements)
		.filter(element => {
			return element.type != 'submit';
		}).reduce((result, element) => {
			const { name, type } = element;
			const value = type == 'checkbox' ? element.checked : element.value;
			result[name] = value;
			return result;
		}, {});
}

function generateElement(tagName, tagClass = '', tagId = '', tagValue = '') {
	const newElement = document.createElement(tagName);
	newElement.className = tagClass;
	newElement.id = tagId;
	newElement.innerText = tagValue;
	return newElement;
}