import './Converter.css'
import { useState } from 'react';

export function Converter() {

    const [url, setUrl] = useState('')
    const [status, setStatus] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [videoTitle, setVideoTitle] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [downloadUrl, setDownloadUrl] = useState('');

    async function handleConvert() {
        setIsLoading(true);
        setStatus('Converting..');

        try {
            const response = await fetch('http://localhost:8000/convert', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: url })
            })

            if (!response.ok) {
                throw new Error('Conversion failed')
            }

            const blob = await response.blob()
            const blobURL = window.URL.createObjectURL(blob)
            setDownloadUrl(blobURL);
            setStatus('Ready to download');
            setUrl('');

        }
        catch (e) {
            setStatus('Something went wrong. Try again');
        }
        finally {
            setIsLoading(false)
            setStatus('');
        }


    }



    async function fetchVideoInfo(inputUrl) {
        if (!inputUrl) return

        try {
            const response = await fetch(`http://localhost:8000/info?url=${encodeURIComponent(inputUrl)}`)
            const data = await response.json();
            setVideoTitle(data.title);
            setThumbnail(data.thumbnail);
        }
        catch (e) {
            setThumbnail('')
            setVideoTitle('')
        }
    }








    return (
        <>
            <div className='conatiner'>
                <div className='pg-content'>

                    <h1 className='heading'>YouTube to MP3 Converter</h1>

                    <p className='subhead'> Paste a YouTube link and downlaod the MP3 audio</p>

                    <input type='text'
                        placeholder='Paste YouTube video link'
                        className='input-box'
                        value={url}
                        onChange={(e) => {
                            setUrl(e.target.value)
                            fetchVideoInfo(e.target.value)
                        }}

                    ></input>

                    {thumbnail && <img src={thumbnail} alt="thumbnail" className='thumbnail' />}
                    {videoTitle && <p className='video-title'>{videoTitle}</p>}

                    <button className='con-button'
                        disabled={isLoading}
                        onClick={handleConvert}>
                        {isLoading ? 'Converting..' : 'Convert'}
                    </button>

                    {isLoading && <div className='progress-bar'><div className='progress-fill'></div></div>}
                    {downloadUrl && (
                        <a href={downloadUrl} download={`${videoTitle}.mp3`} className='download-button'>
                            ⬇ Download MP3
                        </a>
                    )}
                    {status && <p className='status'>{status}</p>}

                </div>



            </div>

        </>
    )
}