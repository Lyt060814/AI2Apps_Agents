import argparse
from moviepy.editor import VideoFileClip, AudioFileClip, ImageClip
from moviepy.video.fx.all import loop
from moviepy.audio.fx.all import audio_loop
import subprocess
import os

def generate_video(video_path, audio_path, output_path):
    video = VideoFileClip(video_path)
    audio = AudioFileClip(audio_path)
    video_width, video_height = video.size
    
    audio_duration = audio.duration
    video_duration = video.duration

    if audio_duration > video_duration:
        looped_video = video.fx(loop, duration=audio_duration)
        final_audio = audio
    else:
        if video_duration > audio_duration:
            looped_video = video.subclip(0, audio_duration)
        else:
            looped_video = video
        final_audio = audio
    final_video = looped_video.set_audio(final_audio)

    temp_output = "temp_" + output_path
    final_video.write_videofile(
        temp_output,
        codec='libx264',
        audio_codec='aac'
    )

    subprocess.run([
        'ffmpeg', '-i', temp_output,
        '-c', 'copy', '-disposition:v:1', 'attached_pic',
        output_path
    ], check=True)
    
    os.remove(temp_output)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate a video with audio and cover image.")
    parser.add_argument("--video_path", default="test.mp4", help="Path to the video file")
    parser.add_argument("--audio_path", default="test.mp3", help="Path to the audio file")
    parser.add_argument("--output_path", default="output.mp4", help="Path to save the output video file")
    args = parser.parse_args()
    generate_video(args.video_path, args.audio_path, args.output_path)
