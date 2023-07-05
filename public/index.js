const setupInputContainer = document.getElementById('setup-input-container')
const movieBossText = document.getElementById('movie-boss-text')

document.getElementById("send-btn").addEventListener("click", () => {
    const setupTextarea = document.getElementById('setup-textarea')
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
        const synopsis = data.choices[0].text.trim()
        document.getElementById('output-text').innerHTML = synopsis
        fetchMovieTitle(synopsis)
        fetchStars(synopsis)
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchMovieTitle(synopsis) {
    try {
        const response = await fetch('/api/get-movie-title', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ synopsis }),
        });
        const data = await response.json();
        const title = data.choices[0].text.trim()
        fetchImagePromt(title, synopsis)
        document.getElementById('output-title').innerText = title
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchStars(synopsis) {
    try {
        const response = await fetch('/api/get-stars', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ synopsis }),
        });
        const data = await response.json();
        const stars = data.choices[0].text.trim()
        document.getElementById('output-stars').innerText = stars
    } catch (error) {
        console.error('Error:', error);
    }
}
async function fetchImagePromt(title, synopsis) {
    try {
        const response = await fetch('/api/get-image-prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, synopsis }),
        });
        const data = await response.json();
        const imagePrompt = data.choices[0].text.trim()
        fetchImageUrl(imagePrompt)
    } catch (error) {
        console.error('Error:', error);
    }
}

async function fetchImageUrl(imagePrompt) {
    try {
        const response = await fetch('/api/get-image-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ imagePrompt }),
        });
        const data = await response.json();
        const imageUrl = data.image_url
        document.getElementById('output-img-container').innerHTML = `<img src="${imageUrl}">`
        setupInputContainer.innerHTML = `<button id="view-pitch-btn" class="view-pitch-btn">View Pitch</button>`
        document.getElementById('view-pitch-btn').addEventListener('click', () => {
            document.getElementById('setup-container').style.display = 'none'
            document.getElementById('output-container').style.display = 'flex'
            movieBossText.innerText = `This idea is so good I'm jealous! It's gonna make you rich for sure! Remember, I want 10% 💰`
        })
    } catch (error) {
        console.error('Error:', error);
    }
}