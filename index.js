const videoPreview = document.getElementById('video-preview');
const videoOutput = document.getElementById('video-output');
const startBtn = document.getElementById('start-btn');
const finishBtn = document.getElementById('finish-btn');

let mediaStream = null;
let mediaRecorder = null;
let recordedMediaUrl = null;

// 1. 카메라로 부터 입력 받기
const constraints = { audio: false, video: true };
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream) {
	// 비디오 트랙을 포함한 MediaStream
	console.log(mediaStream);

	// 2. 카메라로 받은 입력을 HTMLVideoElement를 통해서 실시간으로 출력
	setPreview(mediaStream);

	// MediaStream을 통해 Record 이벤트 등록
	setRecorder(mediaStream);
});

function setPreview(mediaStream) {
	// MediaStream을 HTMLVideoElement의 source 설정
	videoOutput.srcObject = mediaStream;
	// metadata가 로드될 때 실행되는 이벤트
	videoOutput.onloadedmetadata = function() {
		// HTMLVideoElement로 카메라의 화면을 출력하기 시작
		videoOutput.play();
	};
}

function setRecorder(stream) {
	if (!MediaRecorder.isTypeSupported('audio/webm;codecs=opus')) {
		alert('지원하지 않음');
	}

	// 1.MediaStream을 매개변수로 MediaRecorder 생성자를 호출
	const options = {
		audioBitsPerSecond: 128000,
		mimeType: 'audio/webm;codecs=opus'
	};
	const mediaRecorder = new MediaRecorder(stream, options);

	// 2. 전달받는 데이터를 처리하는 이벤트 핸들러 등록
	// 매번 데이터가 준비될 때 마다 dataavailable 이벤트가 발생
	const recordedChunks = [];
	mediaRecorder.addEventListener('dataavailable', function(e) {
		if (e.data.size > 0) {
			recordedChunks.push(e.data);
		}
	});

	mediaRecorder.addEventListener('stop', function() {
		// 생성된 Blob을 매개변수로 URL.createObjectURL 메서드를 호출하면 URL 생성
		// url 사용 완료 이후에는 revokeObjectURL을 호출해줘야함 (메모리 누수 방지)

		// audio 예제
		// const blob = new Blob(recordedChunks);
		// const url = window.URL.createObjectURL(blob);
		// const audio = document.querySelector('audio');
		// audio.src = url;

		// video 예제
		const blob = new Blob(recordedChunks, { 'type': 'video/mp4' });
    const url = window.URL.createObjectURL(blob);
		videoPreview.src = url;

    console.log(url);
	});

	// 녹화 시작, 녹화 종료 핸들러 등록
	startBtn.onclick = () => {
		mediaRecorder.start();
	};
	finishBtn.onclick = () => {
		mediaRecorder.stop();
	};
}
