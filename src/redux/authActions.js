import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { loginSuccess, logoutSuccess } from "./authSlice";

export const signupUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    console.error("Signup Error: ", error.message);
  }
};

export const signinUser = (email, password) => async (dispatch) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    dispatch(loginSuccess(userCredential.user));
  } catch (error) {
    console.error("Signin Error: ", error.message);
  }
};

export const signoutUser = () => async (dispatch) => {
  try {
    await signOut(auth);
    dispatch(logoutSuccess());
  } catch (error) {
    console.error("Signout Error: ", error.message);
  }
};
