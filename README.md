# StealthCoder

A Next.js ghost AI project that interacts with the Gemini API to provide AI-powered assistance while not being detected in screen sharing.

## Running the project locally

Follow these steps to run the project on your local machine:

### 1. Clone the repository
bash git clone <repository_url>

Replace `<repository_url>` with the actual URL of this GitHub repository.

### 2. Navigate to the project directory


bash cd <project_directory>

Replace `<project_directory>` with the name of the directory created after cloning the repository.

### 3. Install dependencies


bash npm install

This command installs all the required packages specified in the `package.json` file.

### 4. Set up environment variables

To use the Gemini API, you need to set up an environment variable for your API key.

- Create a file named `.env.local` in the root of the project.
- Add the following line to the `.env.local` file, replacing `<your_api_key>` with your actual Gemini API key:


GOOGLE_GENAI_API_KEY=<your_api_key>

**Note:** If you don't have a Gemini API key, you'll need to obtain one from Google.

### 5. Run the development server


bash npm run dev

This command starts the Next.js development server.

### 6. Access the application

Open your web browser and go to [http://localhost:3000](http://localhost:3000) to view the application.