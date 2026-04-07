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

### Setup the environment variables

```bash
cd backend
cp env.docker.template .env.docker
```

```bash
cd frontend
cp env.docker.template .env.docker
```

Next, you'll need to set up environment variables  (file .env.docker) in your repo sub-folders backend and frontend.

The application requires also Google Cloud json key (file name gcloud-credentials.json to be saved inside backend folder) to be exported from Google Cloud after adding *Vertex AI user* and *Cloud Run invoker*  roles.

```bash
cp gcloud-credentials.json backend/
```

To start with the application, you'll just need to add your Google Gemini API key and Auth0 credentials for the Web app.

  - You can setup a new Auth0 tenant with an Auth0 Web App and Token Vault following the Prerequisites instructions [here](https://auth0.com/ai/docs/get-started/user-authentication).

Review the docker-compose.yml file to customize settings ( ./backend/.env.docker and ./frontend/.env.docker files ) about particularly :

- Your AuthO tenant parameters / all callback Urls / Client ID / secret
- Your Google Profile (ClientId, ClientSecret,...)
- Your Google Gemini LLM parameters
- urls and/or ports

Now you're ready to start the Full Stack Application:

```bash
# start the application components
docker compose up -d
```

Here are instruction to rebuild the application after any changes about configuration or code set :

```bash
# stop the application components
docker compose build
```

Here are instruction to stop the development services:

```bash
# stop the application components
docker compose down
```

```

This will start a React vite server on port 5173.

![A streaming conversation between the user and the AI](./public/images/home-page.png)

## Screenshots

Architecture

![Architecture](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-architecture.png?raw=true)


![Frontend HomePage](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-homepage.png?raw=true)


![Frontend LoginPage](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-loginpage.png?raw=true)


![Frontend Authorization](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-authorization.png?raw=true)


![Frontend Google SignIn](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-google-sign-in.png?raw=true)


![Frontend Google Auth0 Consent](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-google-auth0-consent.png?raw=true)


![Frontend Auth0 authorize after Google Consent](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-auth0-authorize-after-google-consent.png?raw=true)


![Frontend ChatPage](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-chatpage.png?raw=true)


![Frontend Chat Tools Session](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-chat-tools-session.png?raw=true)


![Frontend Chat Google Id Session](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-frontend-chat-google-id-session.png?raw=true)


![Frontend Docker Containers](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-docker-containers.png?raw=true)


![Google Cloud Run Services](https://github.com/lorcie/auth0-secure-agent/blob/main/assets/auth0-secure-agent-google-cloud-run-services.png?raw=true)


## License

This project is open-sourced under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author

This project is built by [Adrien Chan](https://github.com/lorcie).
