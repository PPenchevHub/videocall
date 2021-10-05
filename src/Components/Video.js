function Video({myVideo, stream, callAccepted, callEnded, userVideo}){

    return(
        	
			<div className="video-container">
				<div className="video">
					{stream &&  <video playsInline muted ref={myVideo} autoPlay style={{ width: "100%" }} />}
				</div>
				<div className="video">
					{callAccepted && !callEnded ?
					<video playsInline ref={userVideo} autoPlay style={{ width: "100%"}} />:
					null}
			    </div>
            </div>

    );


}

export default Video;