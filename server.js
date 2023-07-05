const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const { process } = require("./env")

const app = express();
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

app.post('/api/create-completion', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a short message to enthusiastically say an outline sounds interesting and that you need some minutes to think about it.
      ###
      outline: Two dogs fall in love and move to Hawaii to learn to surf.
      message: I'll need to think about that. But your idea is amazing! I love the bit about Hawaii!
      ###
      outline: A plane crashes in the jungle and the passengers have to walk 1000km to safety.
      message: I'll spend a few moments considering that. But I love your idea!! A disaster movie in the jungle!
      ###
      outline: A group of corrupt lawyers try to send an innocent woman to jail.
      message: Wow that is awesome! Corrupt lawyers, huh? Give me a few moments to think!
      ###
      outline: ${prompt}
      message: 
      `,
      temperature: 1,
      max_tokens: 60,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// route:api/get-synopsis'
app.post('/api/get-synopsis', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate an engaging, professional and marketable movie synopsis based on an outline. The synopsis should include actors names in brackets after each character. Choose actors that would be ideal for this role.
      ###
      outline: A big-headed daredevil fighter pilot goes back to school only to be sent on a deadly mission.
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
      ###
      outline: ${prompt}
      synopsis: 
      `,
      // prompt: `Given the task '${prompt}', please generate a to-do list in markdown format, following the structure given below:
      // - [ ] Task: Task Name
      //     - Date: (input date)
      //     - [ ] Subtask 1
      //     - [ ] Subtask 2
      //     - [ ] Subtask 3
      //     - [ ] Subtask 4
      // If the granularity of the subtasks is still large, please further decompose them into smaller parts. However, the decomposition should not exceed two levels.`,
      temperature: 1,
      max_tokens: 700,
      // top_p: 1,
      // frequency_penalty: 0,
      // presence_penalty: 0,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// route:/api/get-movie-title
app.post('/api/get-movie-title', async (req, res) => {
  const { synopsis } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Generate a movie title based on an synopsis and the title of the movie should be gripping, or flashy
      ###
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
      title: Top Gun
      ###
      synopsis: ${synopsis}
      title:
      `,
      temperature: 0.7,
      max_tokens: 16,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// /api/get-stars
app.post('/api/get-stars', async (req, res) => {
  const { synopsis } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract the names in brackets from the synopsis.
      ###
      synopsis: The Top Gun Naval Fighter Weapons School is where the best of the best train to refine their elite flying skills. When hotshot fighter pilot Maverick (Tom Cruise) is sent to the school, his reckless attitude and cocky demeanor put him at odds with the other pilots, especially the cool and collected Iceman (Val Kilmer). But Maverick isn't only competing to be the top fighter pilot, he's also fighting for the attention of his beautiful flight instructor, Charlotte Blackwood (Kelly McGillis). Maverick gradually earns the respect of his instructors and peers - and also the love of Charlotte, but struggles to balance his personal and professional life. As the pilots prepare for a mission against a foreign enemy, Maverick must confront his own demons and overcome the tragedies rooted deep in his past to become the best fighter pilot and return from the mission triumphant.
      stars: Tom Cruise, Val Kilmer, Kelly McGillis
      ###
      synopsis: ${synopsis}
      stars:
      `,
      max_tokens: 30,
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});

app.post('/api/get-image-prompt', async (req, res) => {
  const { title, synopsis } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Give a short description of an image which could be used to advertise a movie based on a title and synopsis. The description should be rich in visual detail but contain no names .
      ###
      title: Love's Time Warp
      synopsis: When scientist and time traveller Wendy (Emma Watson) is sent back to the 1920s to assassinate a future dictator, she never expected to fall in love with them. As Wendy infiltrates the dictator's inner circle, she soon finds herself torn between her mission and her growing feelings for the leader (Brie Larson). With the help of a mysterious stranger from the future (Josh Brolin), Wendy must decide whether to carry out her mission or follow her heart. But the choices she makes in the 1920s will have far-reaching consequences that reverberate through the ages.
      image description: A silhouetted figure stands in the shadows of a 1920s speakeasy, her face turned away from the camera. In the background, two people are dancing in the dim light, one wearing a flapper-style dress and the other wearing a dapper suit. A semi-transparent image of war is super-imposed over the scene.
      ###
      title: zero Earth
      synopsis: When bodyguard Kob (Daniel Radcliffe) is recruited by the United Nations to save planet Earth from the sinister Simm (John Malkovich), an alien lord with a plan to take over the world, he reluctantly accepts the challenge. With the help of his loyal sidekick, a brave and resourceful hamster named Gizmo (Gaten Matarazzo), Kob embarks on a perilous mission to destroy Simm. Along the way, he discovers a newfound courage and strength as he battles Simm's merciless forces. With the fate of the world in his hands, Kob must find a way to defeat the alien lord and save the planet.
      image description: A tired and bloodied bodyguard and hamster standing atop a tall skyscraper, looking out over a vibrant cityscape, with a rainbow in the sky above them.
      ###
      title: ${title}
      synopsis: ${synopsis}
      image description: 
      `,
      temperature: 0.8,
      max_tokens: 100
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
// /api/get-image-url
app.post('/api/get-image-url', async (req, res) => {
  const { imagePrompt } = req.body;
  try {
    const response = await openai.createImage({
      prompt: `${imagePrompt}.There are no words showed in the image.`,
      n: 1,
      size: '256x256',
    });
    image_url = response.data.data[0].url;
    res.json({ image_url });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
});
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server listening on port 3000'));