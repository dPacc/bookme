process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const axios = require("axios");

const cookie =
  "express:sess=eyJqd3QiOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKcFpDSTZJall4TkdZek1UTTNaakUyTWpNd01EQXhPVGMzWW1ObVlTSXNJbVZ0WVdsc0lqb2laR1ZsY0VCbmJXRnBiQzVqYjIwaUxDSnBZWFFpT2pFMk16STJNelV4T1RoOS5sWXlTVDV1aDh2RWJlN2tZTHpMMl9XcGh5TVVsLV9VZmdCSmUzdktGZHkwIn0=";

const doRequest = async () => {
  const { data } = await axios.post(
    `https://bookme.dev/api/tickets`,
    { title: "ticket", price: 5 },
    {
      headers: { cookie },
    }
  );

  await axios.put(
    `https://bookme.dev/api/tickets/${data.id}`,
    { title: "ticket", price: 10 },
    {
      headers: { cookie },
    }
  );

  axios.put(
    `https://bookme.dev/api/tickets/${data.id}`,
    { title: "ticket", price: 15 },
    {
      headers: { cookie },
    }
  );

  console.log("Request complete");
};

(async () => {
  for (let i = 0; i < 200; i++) {
    doRequest();
  }
})();
