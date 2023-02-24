const batteryLevel = document.querySelector(".battery--level__percent");
const batteryPercent = document.querySelector(".battery--detail__percent");
const batteryStatus = document.querySelector(".battery--detail__status");

const detectBattery = () => {
  navigator.getBattery().then((battery) => {
    const changeData = () => {
      let level = Math.floor(battery.level * 100);
      batteryPercent.innerHTML = level;
      batteryLevel.style.height = `${level}%`;

      if (level == 100) {
        batteryStatus.innerHTML =
          'Battery Full <i class="ri-battery-2-fill green-color"></i> (plug out)';
      } else if ((level <= 20) & !battery.charging) {
        batteryStatus.innerHTML = `Low Charge <i class="ri-plug-line animated-red animated-red"></i>`;
      } else if (battery.charging) {
        batteryStatus.innerHTML = `Charging ... <i class="ri-flashlight-line animated-green"></i>`;
      } else {
        batteryStatus.innerHTML = "";
      }

      if (level >= 70) {
        batteryLevel.classList.add("green");
        batteryLevel.classList.remove("red", "orange", "yellow");
      } else if (level >= 40) {
        batteryLevel.classList.add("yellow");
        batteryLevel.classList.remove("red", "orange", "green");
      } else if (level >= 20) {
        batteryLevel.classList.add("orange");
        batteryLevel.classList.remove("red", "green", "yellow");
      } else {
        batteryLevel.classList.add("red");
        batteryLevel.classList.remove("orange", "green", "yellow");
      }
    };

    changeData();
    battery.addEventListener("chargingchange", changeData);
    battery.addEventListener("levelchange", changeData);
  });
};

detectBattery();
