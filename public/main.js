var remoteControl = new RemoteControl();
var recognition = new webkitSpeechRecognition();
recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = "en-US";
recognition.continuous = true;
recognition.start();

recognition.onresult = function(event) {
  for (var i = event.resultIndex; i < event.results.length; ++i) {
    if (event.results[i].isFinal) {
      if (event.results[i][0].transcript.trim() == "light on") {
          remoteControl.on();
        } else if (event.results[i][0].transcript.trim() == "light off") {
          remoteControl.off();
        }
      }
      console.info(`You said : ${event.results[i][0].transcript}`);
    }
};
