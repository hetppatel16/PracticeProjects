const hour = document.getElementById("hour");
const minute = document.getElementById("minute");
const second = document.getElementById("second");
function updateClock(){
    let d = new Date();
    let hTime = d.getHours();
    let mTime = d.getMinutes();
    let sTime = d.getSeconds();
    let msTime = d.getMilliseconds();

    let hRotation = 30*hTime + 0.5*mTime + (1/120)*sTime;
    let mRotation = 6*mTime + 0.1*sTime;
    let sRotation = 6*sTime + msTime*0.006;

    hour.style.transform = `rotate(${hRotation}deg)`;
    minute.style.transform = `rotate(${mRotation}deg)`;
    second.style.transform = `rotate(${sRotation}deg)`;
};
setInterval(updateClock,50);
updateClock();