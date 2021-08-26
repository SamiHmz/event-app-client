var apiUrl, baseUrl;

if (process.env.NODE_ENV === "development") {
  apiUrl = "http://localhost:1998/api/v1/";
  baseUrl = "http://localhost:1998/";
} else {
  apiUrl = "https://esivent-backend.herokuapp.com/api/v1/";
  baseUrl = "https://esivent-backend.herokuapp.com/";
}

export { apiUrl, baseUrl };
