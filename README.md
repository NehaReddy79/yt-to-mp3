# YouTube to MP3 Converter

A full stack web application that converts YouTube videos to downloadable MP3 files.

## Live Demo
- Frontend: https://yt-to-mp3-olive.vercel.app
- Backend: https://yt-to-mp3-ue35.onrender.com

> **Note:** The live demo may not work due to YouTube's bot detection on cloud servers. For full functionality, run locally.

## Features
- Paste a YouTube URL and instantly preview the video thumbnail and title
- Convert YouTube audio to MP3 format
- Rate limiting to prevent server abuse
- Mobile responsive design

## Tech Stack
- **Frontend:** React, Vite, CSS
- **Backend:** FastAPI, Python
- **Audio:** yt-dlp, ffmpeg
- **Deployment:** Vercel (frontend), Render (backend)

## How to Run Locally

### Prerequisites
- Python 3.x
- Node.js
- ffmpeg installed on your system

### Backend
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
uvicorn app:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## Limitations

### YouTube Bot Detection
When deployed on cloud servers like Render, YouTube detects and blocks requests from server IPs with a 429 error. 

The solution is cookie-based authentication ,exporting browser cookies from a logged-in YouTube account and passing them to yt-dlp so it authenticates as a real user.
This was implemented and confirmed working (cookies loaded successfully on the server), however a separate middleware compatibility issue between slowapi and Starlette prevented the full conversion from completing on the live deployment.

**The app works fully when run locally** since YouTube does not block residential IPs.



