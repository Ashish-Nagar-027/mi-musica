import YouTube, { YouTubeProps, YouTubeEvent } from 'react-youtube';


const YoutubeVideoPlayer = ({onEnd, videoId}: {videoId: string, onEnd:(event: YouTubeEvent<number>) => void;}) => {

     const opts: YouTubeProps['opts'] = {
    height: '500',
    width: '100%',

    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };

  return (
    <YouTube videoId={videoId} opts={opts} onEnd={onEnd} />
  )
}

export default YoutubeVideoPlayer

