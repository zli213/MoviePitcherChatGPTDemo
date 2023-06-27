// import { process } from "./env"
// import { Configuration, OpenAIApi } from 'openai'
// const apikey = process.env.OPENAI_API_KEY


const setupTextarea = document.getElementById('setup-textarea')
const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

// const configuration = new Configuration({
//     apiKey: process.env.OPENAI_API_KEY
// })
// const openai = new OpenAIApi(configuration)


document.getElementById("send-btn").addEventListener("click", () => {
    const prompt = 'Sound enthusiastic in five words or less.';
    // if (setupTextarea.value) {
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`
    // }
    fetchBotReply(prompt)
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
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}