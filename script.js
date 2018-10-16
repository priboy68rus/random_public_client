const form = document.querySelector('form');
const selectElement = document.querySelector('form select');
const msgElement = document.querySelector('#msg');

const API_URL = 'http://178.128.204.49:5000';

addTypesToForm();


form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const msg_type = formData.get('msg-type');
    const name_added = formData.get('name-added');

    req_body = {
        'msg_type': msg_type,
        'name_added': name_added
    }

    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(req_body),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            msg = data[0] + '\n' + data[1];
            msgElement.textContent = msg;
        });


});

function addTypesToForm() {
    fetch(API_URL + '/types')
        .then(response => response.json())
        .then(data => {
            for (i = 0; i < data.len; i++) {
                const optionElement = document.createElement('option');
                optionElement.setAttribute('value', i);
                optionElement.textContent = data.getters[i];

                selectElement.appendChild(optionElement);
            }
        });
}