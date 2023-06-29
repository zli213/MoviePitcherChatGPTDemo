const express = require('express');
const path = require('path');
const { Configuration, OpenAIApi } = require('openai');
const { process } = require("./env")

const app = express();
app.use(express.json()); // 这样我们就可以解析 JSON 请求体

// 允许从 'public' 目录服务静态文件
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
      prompt: `Generate a more than 50 words and less than 80 words message to enthusiastically say "${prompt}" sounds interesting and that you need some minutes to think about it. Mention one aspect of the sentence. `,
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
// route:api/get-synopsis'
app.post('/api/get-synopsis', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await openai.createCompletion({
      model: 'text-davinci-003',
      // prompt: `Generate an engaging, professional and marketable movie synopsis based on the following idea: ${prompt}. `,
      prompt: `Given the task '${prompt}', please generate a to-do list in markdown format, following the structure given below:
      - [ ] Task: Task Name
          - Date: (input date)
          - [ ] Subtask 1
          - [ ] Subtask 2
          - [ ] Subtask 3
          - [ ] Subtask 4
      If the granularity of the subtasks is still large, please further decompose them into smaller parts. However, the decomposition should not exceed two levels.`,
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

// 当用户访问网站根路径时，发送 'index.html' 文件
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => console.log('Server listening on port 3000'));