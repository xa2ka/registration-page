document.getElementById('registerForm').addEventListener('submit', function(event) {
    // Получаем поле почты
    var emailInput = document.getElementById('email');
    var emailValue = emailInput.value;
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Регулярное выражение для проверки формата почты

    // Проверяем формат почты
    if (!emailPattern.test(emailValue)) {
        event.preventDefault();
        emailInput.classList.add('error');
        alert("Введите корректный адрес электронной почты!");
    } else {
        emailInput.classList.remove('error');
    }
});

document.getElementById('registerForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Считывание данных из формы
    const lastName = document.getElementById("lastName").value;
    const firstName = document.getElementById("firstName").value;
    const phone = document.getElementById("phone").value;
    const email = document.getElementById("email").value;
    const dob = document.getElementById("dob").value;

    // Формирование сообщения для Telegram
    const message = `
    Новый пользователь зарегистрирован:

    Фамилия: ${lastName}
    Имя: ${firstName}
    Телефон: ${phone}
    Почта: ${email}
    Дата рождения: ${dob}
    `;

    const TELEGRAM_BOT_TOKEN = '7871529863:AAEIYdQiaT2ZeC7Mg84wGRuNjtlkpqP4YTk';
    const CHAT_ID = '282101442'; // ID чата или пользователя, куда отправляются сообщения

    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const data = {
        chat_id: CHAT_ID,
        text: message,
    };

    // Отправка данных в Telegram
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            alert('Регистрация прошла успешно!');

            // Показать кнопку Telegram
            const telegramButton = document.getElementById('telegramButtonContainer');
            telegramButton.style.display = 'block';
        } else {
            alert('Ошибка при отправке данных в Telegram: ' + data.description);
        }
    })
    .catch(error => {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных.');
    });
});



function copyToClipboard() {
    const copyText = document.getElementById('copyText');
    copyText.select();
    copyText.setSelectionRange(0, 99999); // Для мобильных устройств
    navigator.clipboard.writeText(copyText.value)
        .then(() => alert('Ссылка скопирована!'))
        .catch(() => alert('Не удалось скопировать ссылку.'));
}

function navigateToLink() {
    const link = document.getElementById('copyText').value;
    window.open(link, '_blank');
}