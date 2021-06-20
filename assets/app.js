const pagar = async (img, title, price, unit) => {
  const data = { img, title, price, unit };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    await fetch("https://oscarcornej-mp-commerce-nodejs.herokuapp.com/detail", options);
  } catch (error) {
    console.log(error);
  }
};
