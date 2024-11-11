document.getElementById('botonGiro').addEventListener('click', function() {
    document.getElementById('elemento').classList.toggle('girado');
});

let questions = document.querySelectorAll('.question');

function nextQuestion(currentIndex) {
    questions[currentIndex].classList.remove('active');
    questions[currentIndex + 1].classList.add('active');
}

function previousQuestion(currentIndex) {
    questions[currentIndex].classList.remove('active');
    questions[currentIndex - 1].classList.add('active');
}

function finishSurvey() {
    const q1 = document.querySelector('input[name="q1"]:checked')?.value;
    const q2 = document.querySelector('input[name="q2"]:checked')?.value;
    const q3 = document.querySelector('input[name="q3"]:checked')?.value;

    if (!q1 || !q2 || !q3) {
        alert("Por favor, responde todas las preguntas.");
        return;
    }

    const surveyData = { q1, q2, q3 };

    fetch('http://localhost:3000/submit-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyData),
    })
    .then(response => {
        if (response.ok) {
            alert('Gracias por completar la encuesta! Tus respuestas han sido guardadas.');
        } else {
            alert('Hubo un problema al guardar tus respuestas. Inténtalo nuevamente.');
        }
    })
    .catch(error => {
        console.error('Error al enviar los datos:', error);
        alert('Error al enviar los datos. Verifica tu conexión y vuelve a intentarlo.');
    });
}
