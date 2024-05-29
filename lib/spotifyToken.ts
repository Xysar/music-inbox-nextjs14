let accessToken: string | null = null;
let tokenExpiryTime: number | null = null;
var base64 = require("base-64");
export async function getAccessToken() {
  if (!accessToken || Date.now() >= tokenExpiryTime!) {
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization:
          "Basic " +
          base64.encode(
            `${process.env.SPOTIFY_CLIENTID}:${process.env.SPOTIFY_SECRET}`
          ),
      },
      body: new URLSearchParams({
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();

    if (response.ok) {
      accessToken = data.access_token;
      tokenExpiryTime = Date.now() + data.expires_in * 1000; // Convert expiry time to milliseconds
    } else {
      throw new Error("Failed to retrieve access token");
    }
  }

  return accessToken;
}
export async function getTopTracks() {
  const token = await getAccessToken().catch((error) => {
    return error;
  });
  console.log(token);

  let result = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .catch((err) => console.log(err));

  return result;
}
