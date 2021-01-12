function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}




// window.onload = function () {
//     var fiveMinutes = 60 * 5,
//         display = document.querySelector('#counter');
//     startTimer(fiveMinutes, display);
// };

document.getElementById("startTimer").addEventListener("click", beginTimer, setColor);

function beginTimer() {
    var fiveMinutes = 60 * 5,
        display = document.querySelector('#counter');
    startTimer(fiveMinutes, display);;
    
  }

//   function setColor(){
//     document.getElementById("#counter").style.color = "blue";
//   }

var button = document.querySelector("startTimer");

function setColor() {
    document.getElementById("#counter").style.color = "blue"
}