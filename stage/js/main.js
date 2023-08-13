const ip = document.querySelector(".ip"),
  locat = document.querySelector(".location"),
  timezone = document.querySelector(".timezone"),
  isp = document.querySelector(".isp");

fetch(
  "https://geo.ipify.org/api/v2/country,city?apiKey=at_k7GW2Q8AdBYL61lqFJ7rKvijROBJo&ipAddress=8.8.8.8"
)
  .then((request) => request.json())
  .then((add) => {
    ip.innerHTML = `<p>IP Address</p> <h3>${add.ip}</h3>`;
    locat.innerHTML = `<p>Location</p> <h3>${add.location.region}, ${add.location.country} ${add.as.asn}</h3>`;
    timezone.innerHTML = `<p>Timezone</p> <h3>UTC ${add.location.timezone}</h3>`;
    isp.innerHTML = `<p>ISP</p> <h3>${add.isp}</h3>`;
  })
  .catch((error) => console.log(error));
