const pagar = async (img, title, price, unit) => {
  console.log("pagar");
  const data = { img, title, price, unit };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    const response = await fetch(
      "https://oscarcornej-mp-commerce-nodejs.herokuapp.com/detail",
      options
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
