from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import yt_dlp
from fastapi.responses import FileResponse, HTMLResponse
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from slowapi.middleware import SlowAPIMiddleware
from fastapi.middleware.cors import CORSMiddleware
import os
import re





limiter  =Limiter(key_func = get_remote_address, default_limits = ["5/minute"])
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"]
)


app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, lambda request , exc : HTTPException( status_code = 429, detail="Too many request"))
app.add_middleware(SlowAPIMiddleware)


class vidURL(BaseModel):
    url : str

@app.get("/")
def greet():
    return {"message": "server running"}


@app.get("/info")
def get_detail(url : str):
    try:
        with yt_dlp.YoutubeDL({}) as ydl : 
            info = ydl.extract_info(url, download=False)
            return {
                "title" : info.get("title"),
                "thumbnail" : info.get("thumbnail")
            }
    except Exception as e:
        raise HTTPException(status_code = 400, detail=str(e))

@app.post("/convert")
@limiter.limit("5/minute")
def getlink(llink : vidURL, request : Request):
    
    try:
        with yt_dlp.YoutubeDL({}) as ydl:
            info = ydl.extract_info(llink.url, download = False)
            clean_title = re.sub(r'[\\/*?:"<>|]', '', info['title'])

        options = {
            "format" : "bestaudio/best",
            "outtmpl": os.path.join("downloads", f"{clean_title}.%(ext)s"),
            "postprocessors" : [{
            "key" : "FFmpegExtractAudio",
            "preferredcodec" : "mp3"
            }],
            "ffmpeg_location": r"C:\Users\NEHA  REDDY\Downloads\ffmpegg\ffmpeg\bin"
        }   

        with yt_dlp.YoutubeDL(options) as ydl:
            ydl.download([llink.url])

        file_path= os.path.join("downloads", f"{clean_title}.mp3")

        return FileResponse(file_path, media_type = "audio/mpeg", filename = f"{clean_title}.mp3")
    

    except Exception as e:
        raise HTTPException(status_code = 404,detail = str(e) )

    
    

    


