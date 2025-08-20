const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/auth`;
import axios from "axios";

const signUp = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/sign-up`, formData);
    if (!res.data) throw new Error("Error something went wrong creating user");
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      return JSON.parse(atob(res.data.token.split(".")[1])).payload;
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// const signUp = async (formData) => {
//   try {
//     const res = await fetch(`${BASE_URL}/sign-up`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(formData),
//     });

//     const data = await res.json();

//     if (data.err) {
//       throw new Error(data.err);
//     }

//     if (data.token) {
//       localStorage.setItem("token", data.token);
//       return JSON.parse(atob(data.token.split(".")[1])).payload;
//     }

//     throw new Error("Invalid response from server");
//   } catch (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// };

const signIn = async (formData) => {
  try {
    const res = await fetch(`${BASE_URL}/sign-in`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (data.err) {
      throw new Error(data.err);
    }

    if (data.token) {
      localStorage.setItem("token", data.token);
      return JSON.parse(atob(data.token.split(".")[1])).payload;
    }

    throw new Error("Invalid response from server");
  } catch (err) {
    console.log(err);
    throw new Error(err);
  }
};

export { signUp, signIn };
