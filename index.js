const videoOutput = document.getElementById('video-output');

// 1. 카메라로 부터 입력 받기
const constraints = { audio: false, video: true };
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
	// 비디오 트랙을 포함한 MediaStream
	console.log(mediaStream);

  // 2. 카메라로 받은 입력을 HTMLVideoElement를 통해서 실시간으로 출력
	// MediaStream을 HTMLVideoElement의 srouce로 설정
	videoOutput.srcObject = mediaStream;
	// metadata가 로드될 때 실행되는 이벤트
	videoOutput.onloadedmetadata = function() {
		// HTMLVideoElement로 카메라의 화면을 출력하기 시작
		videoOutput.play();
	};
});


