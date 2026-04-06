# Auth0-Secure-Agent: An AI Personal Assistant Secured with Auth0 - LangGraph Python/FastAPI Version

Auth0-Secure-Agent an AI personal assistant that consolidates your digital life by dynamically accessing multiple tools to help you stay organized and efficient.

## Code Principle

This codeset mainly uses the following libraries:



## 🚀 Getting Started

First, clone this repo and download it locally.

```bash
git clone https://github.com/lorcie/auth0-secure-agent.git
cd auth0-secure-agent
```

The project is divided into two parts:

- `backend/` contains the backend code for the Web app and API written in Python using FastAPI.
- `frontend/` contains the frontend code for the Web app written in React as a Vite SPA.

### Setup the backend

```bash
cd backend
```

Next, you'll need to set up environment variables in your repo's `.env` file. Copy the `.env.example` file to `.env`.

To start with the basic examples, you'll just need to add your OpenAI API key and Auth0 credentials.

- To start with the application, you'll just need to add your Google Gemini API key and Auth0 credentials for the Web app.
  - You can setup a new Auth0 tenant with an Auth0 Web App and Token Vault following the Prerequisites instructions [here](https://auth0.com/ai/docs/get-started/user-authentication).


Review the docker-compose.yml file to customize settings ( ./backend/.env.docker and ./frontend/.env.docker files ) about particularly :

- Your AuthO tenant parameters / urls / Client ID / secret
- Your Google Gemini LLM parameters
- urls and/or ports

Now you're ready to start the Full Stack Application:

```bash
# start the application components
docker compose up -d
```

Now you're ready to run the development server:

```bash
# stop the application components
docker compose down
```

```

This will start a React vite server on port 5173.

![A streaming conversation between the user and the AI](./public/images/home-page.png)


## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

This project is built by [Adrien Chan](https://github.com/lorcie).
