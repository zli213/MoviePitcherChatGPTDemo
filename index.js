const apikey = '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'

const url = "https://api.openai.com/v1/completions"

// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${apikey}`
//     },
//     body: JSON.stringify({
//         'model': 'text-davinci-003',
//         'prompt': 'Sound sympathetic in five words or less.',
//     })
// }).then(response => response.json()).then(data => console.log(data))

const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
    // if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    // }
    fetchBotReply()
})
function fetchBotReply() {
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apikey}`
        },
        body: JSON.stringify({
            'model': 'text-davinci-003',
            'prompt': 'Sound enthusiastic in five words or less.',
        })
    }).then(response => response.json()).then(data =>
        movieBossText.innerText = data.choices[0].text.trim()
    )
}