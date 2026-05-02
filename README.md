
# YouTube to MP3 Converter

A full stack web app that converts YouTube videos to downloadable MP3 files.

## Tech Stack
- **Frontend:** React + Vite
- **Backend:** FastAPI (Python)
- **Audio:** yt-dlp + ffmpeg

## Features
- Paste a YouTube URL and preview the thumbnail and title
- Convert and download as MP3
- Rate limiting to prevent abuse
- Mobile responsive

## How to Run Locally

### Backend
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload


### Frontend
cd frontend
npm install
npm run dev
=======

