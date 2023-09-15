const API_URL = "https://fakestoreapi.com/products";
const LOGIN_URL = "https://fakestoreapi.com/auth/login";

export async function fetchProducts() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchSingleProduct(productId) {
  try {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

export async function fetchLogin(username, password) {
  const userLogin = "johnd";
  const passLogin = "m38rmF$";
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: userLogin,
        password: passLogin,
      }),
    });
    const result = await response.json();
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
  }
}
