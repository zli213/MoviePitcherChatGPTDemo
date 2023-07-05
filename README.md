# Movie Pitch Generator with OpenAI API

Movie Pitch Generator is a web application and API that generates compelling movie pitches from your single-sentence movie concepts using OpenAI's GPT-X model. It provides an intuitive UI for users to input their movie concepts and get detailed movie pitches including a captivating title, a gripping synopsis, the choice of the cast, an illustrative movie poster, and a brief image description for advertisement purposes.

## Setup

Clone this repository to your local system. You will need Node.js installed and a modern browser to run the HTML and Javascript files. You may also need a local server if your browser doesn't support ES6 modules.

## Installation

1. Clone the repository to your local machine

   ```
   git clone https://github.com/yourusername/yourrepository.git
   ```

2. Navigate to the project directory

   ```
   cd yourrepository
   ```

3. Install the dependencies

   ```
   npm install
   ```

4. Create a `.env` file in the root directory of your project. Add the following environment variable:

   ```
   OPENAI_API_KEY='YOUR_OPENAI_API_KEY'
   ```

   Note: The sample OpenAI API key provided in the test environment is no longer active. Please replace it with your own OpenAI API key.
5. Start the server

   ```
   node server.js
   ```

## How to Use

1. Enter your single-sentence movie concept in the provided text area.
2. Click the "Send" button.
3. Wait for the AI to generate and display the movie pitch, including the title, synopsis, cast, movie poster, and image description.

## Functionality

The Movie Pitch Generator provides the following main functionalities:

1. Accepts user's single-sentence movie concept as input.
2. Generates detailed movie pitch including title, synopsis, cast, movie poster, and image description.
3. Displays the results on the UI.

## Implementation

The project is implemented using HTML, CSS, and JavaScript. It leverages the Fetch API to make asynchronous requests to various endpoints provided by the OpenAI API. These requests take the movie concept as input and return the detailed movie pitch data.

## Features

1. **Interactive UI**: The UI is intuitive and user-friendly, providing a text area for user input and an output section for displaying the movie pitch.
2. **Responsive Design**: The web application is designed to be mobile-friendly and adaptable to different screen sizes.
3. **AI Integration**: The application integrates OpenAI's GPT-3 model to generate compelling and creative movie pitches.

Please note, this project is still under development and more features will be added soon.

## API Usage

Refer to the instructions in the "Installation" section for setting up the API. Below are the API endpoints provided by the Movie Pitch Generator:

- Generate a short message: `POST /api/create-completion`
- Generate a movie synopsis: `POST /api/get-synopsis`
- Generate a movie title: `POST /api/get-movie-title`
- Extract stars from the movie synopsis: `POST /api/get-stars`
- Generate an image description for a movie advertisement: `POST /api/get-image-prompt`
- Generate an image URL for the movie advertisement: `POST /api/get-image-url`

For detailed request and response structure, refer to the original readme in the repository.

## Contributing

We welcome contributions from the community. Please read the contributing guidelines before starting.

## License

This project is licensed under the terms of the MIT license.

## Contact

For any questions or concerns, feel free to reach out at `lzh8612@outlook.com`.
