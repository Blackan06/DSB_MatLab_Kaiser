$(document).ready(function() {
    const startButton = document.getElementById('start-recording');
    const stopButton = document.getElementById('stop-recording');
    const audioElement = document.getElementById('audio');
    let mediaRecorder;
    let chunks = [];

    startButton.addEventListener('click', startRecording);
    stopButton.addEventListener('click', stopRecording);

    function startRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function(stream) {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.ondataavailable = function(e) {
                    chunks.push(e.data);
                }

                mediaRecorder.onstop = function() {
                    const audioBlob = new Blob(chunks, { 'type': 'audio/ogg; codecs=opus' });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    audioElement.src = audioUrl;
                }
            })
            .catch(function(err) {
                console.error('Error recording audio: ', err);
            });

        startButton.disabled = true;
        stopButton.disabled = false;
    }

    function stopRecording() {
        mediaRecorder.stop();
        startButton.disabled = false;
        stopButton.disabled = true;
    }
});
