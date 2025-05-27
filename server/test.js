const axios = require("axios");

axios.post("http://localhost:3001/register", {
  nome: "Ana",
  idade: 28
})
.then(response => {
  console.log(response.data);
})
.catch(error => {
  console.error("Erro:", error);
});