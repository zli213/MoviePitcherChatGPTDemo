
const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
    // const prompt = 'Sound enthusiastic in five words or less.';
    if (setupTextarea.value) {
        const userInput = setupTextarea.value
        setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
        movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
        fetchBotReply(userInput)
        fetchSynopsis(userInput)
    }
})
async function fetchBotReply(prompt) {
    try {
        const response = await fetch('/api/create-completion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });
        const data = await response.json();
        movieBossText.innerText = data.choices[0].text.trim()
        console.log(data)
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchSynopsis(prompt) {
    try {
        const response = await fetch('/api/get-synopsis', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),

        });
        const data = await response.json();
        console.log(data)
        document.getElementById('output-text').innerHTML = data.choices[0].text
        document.getElementById('output-container').style.display = 'block'
    } catch (error) {
        console.error('Error:', error);
    }
}