import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1/",
});

const client = (options) => {
  console.log(options);
  const onSuccess = (response) => {
    console.log(response);
  };
  const onError = (err) => {
    console.log(err);
  };

  return instance(options).then(onSuccess).catch(onError);
};

export default client;
