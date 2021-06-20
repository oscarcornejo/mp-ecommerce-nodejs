const pagar = async (img, title, price, unit) => {
  const data = { img, title, price, unit };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  await fetch("https://oscarcornej-mp-commerce-nodejs.herokuapp.com/detail", options)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      //   console.log("data = ", data);
      window.location.href = data.url_redirect;
    })
    .catch(function (err) {
      console.error(err);
    });
};
