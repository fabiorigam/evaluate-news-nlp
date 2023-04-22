function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('name').value
    checkForName(formText)

    console.log("::: Form Submitted :::")
    fetch('http://localhost:8080/test')
    .then(res => res.json())
    .then(function(res) {
        document.getElementById('results').innerHTML = "Polarity: "+checkPopularity(res.score_tag);
    })
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

export { handleSubmit }
export {checkPopularity}