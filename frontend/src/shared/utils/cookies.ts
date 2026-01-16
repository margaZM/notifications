import Cookies from "js-cookie";

export const saveToken = (token: string) => {
  Cookies.set("token", token, {
    expires: 7,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });
};

export const getToken = () => Cookies.get("token");
export const removeToken = () => Cookies.remove("token");
