const pagar = async (img, title, price, unit) => {
  console.log("pagar");
  const data = { img, title, price, unit };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-type": "application/json; charset=UTF-8" },
  };

  try {
    const response = await fetch("http://localhost:3000/detail", options);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
