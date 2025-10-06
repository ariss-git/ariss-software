import app from "./server";

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});
