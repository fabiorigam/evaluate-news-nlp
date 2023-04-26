function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value

    if (checkForUrl(formText)) {
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

function checkForUrl(inputURL) {
    let regex = inputURL.match(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);

    if(regex == null){
        return 0;
    } else{
        return 1;
    }
}


export { handleSubmit }
export { checkPopularity }