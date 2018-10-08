class RemoteControl {

  constructor() {}

  on() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/light/on", true);
    xhttp.send();
  }

  off() {
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/light/off", true);
    xhttp.send();
  }
}
