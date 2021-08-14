# study.web-recording

Recording Process
1. media data의 source 생성 (MediaStream or HTMLMediaElement)
2. MediaRecorder 객체 생성 (source와 option 인수 전달)
3. MediaRecorder.ondataavailable 이벤트 핸들러 등록
4. source에서 데이터가 생성되면, MediaRecorder.start() 메소드를 호출하여 Recording 시작
5. 매번 데이터가 준비될 때 마다 dataavailable 이벤트가 발생
6. MediaRecorder.stop() 메소드를 호출하여 Recording 중지

### MediaStream 얻기
- 웹캠, 오디오: mediaDevices.getUserMedia()
- 스크린: MediaDevices.getDisplayMedia()
- HTMLCanvas에 렌더링 되는 콘텐츠: HTMLMediaElement.captureStream()

### 참고
- [링크1](https://melius.tistory.com/59)
- [링크2](https://medium.com/watcha/%EC%9B%B9%EB%B8%8C%EB%9D%BC%EC%9A%B0%EC%A0%80%EC%97%90%EC%84%9C-%EB%8F%99%EC%9E%91%ED%95%98%EB%8A%94-%EB%85%B9%ED%99%94%EC%95%B1-%EB%A7%8C%EB%93%A4%EA%B8%B0-70142ce28994)
