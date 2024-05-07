# Sociobot 🤖

Sociobot is a Telegram bot designed to simplify social media presence management by generating engaging posts for various platforms based on user input. With Sociobot, you can effortlessly maintain an active and lively online presence with just a few updates and a single command.

## How to Use

1. **Create a Telegram Bot**: Start by creating a Telegram bot using BotFather on Telegram.
2. **Import Dependencies**: Run `npm install` to import all the necessary dependencies.
3. **Get Gemini API Key**: Obtain your Gemini API key from Google AI Studio.
4. **Set Environment Variables**: Set up the following environment variables in a `.env` file:
```
BOT_TOKEN=your_telegram_bot_token_here
MONGO_URI=your_mongo_uri_here
API_KEY=your_gemini_api_key_here
```


6. **Start the Bot**: Run `npm run dev` to start the Sociobot. Ensure that you are using Node.js version 20.11 or higher. You can check your Node.js version by typing `node --version` in the terminal.

## System Requirements

- Node.js 20.11 or higher

## Features

- **Easy Social Media Management**: Simplify your social media presence by generating posts for LinkedIn, Twitter, and Facebook with just a few lines of updates.
- **Engaging Post Generation**: Utilizes Google's Gemini-Pro model to create visually appealing posts, enhancing user engagement and visibility on social platforms.
- **Efficient Data Management**: Stores user input and processed data in MongoDB, ensuring seamless post generation.
- **Scalable and User-Friendly**: Sociobot is designed to be scalable and user-friendly, with a growing user base of over 50 individuals.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit pull requests. Together, let's make Sociobot even better! 🚀
