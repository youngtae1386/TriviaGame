
   
   
   var timeleft = 50;
    var downloadTime = setInterval(function(){
    timeleft--;
    document.getElementById("countDownTimer").textContent = timeleft;
    document.getElementById("progressBar").value=50 - timeleft;
    if(timeleft <= 0)
        clearInterval(downloadTime);
    },1000);
