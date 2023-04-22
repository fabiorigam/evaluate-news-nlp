function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    let CheckForName = Client.checkForName(formText)

    if (Client.checkForUrl(formText)) {
        console.log("::: Form Submitted :::")

        post('http://localhost:8080/api', {url: formText})
        .then(function(res) {
            document.getElementById('polarity').innerHTML = 'Polarity: '+checkPopularity(res.score_tag);
            document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
            document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
            document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
            document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
        })
    } else {
        alert('Please enter a valid URL');
    }
}

const checkPopularity = (input) => {
    let result;
    switch (input){
        case 'P+':
            result = 'strong positive';
            break;
        case 'P':
            result = 'positive';
            break;
        case 'NEW':
            result = 'neutral';
            break;
        case 'N':
            result = 'negative';
            break;
        case 'N+':
            result = 'strong negative';
            break;
        case 'NONE':
            result = 'no sentiment';
    }
    return result.toUpperCase();
}

const post = async (url = "", data = {}) => {
    const resp = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const Data = await resp.json();
        console.log('Received: ', Data)
        return Data;
    } catch (error) {
        console.log('Error: ', error);
    }
};


export { handleSubmit }
export { checkPopularity }