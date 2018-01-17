import { AsyncStorage } from "react-native";
export function* storeToken(name, responseData) {
  yield AsyncStorage.setItem(name, responseData, err => {
    if (err) {
      //   console.warn("an error");
      throw err;
    }
  }).catch(err => {
    throw err;
  });
}
export async function getToken(name) {
  try {
    // console.warn('ko co token 111');
    let accessToken = await AsyncStorage.getItem(name);
    if (!accessToken) {
      //   console.warn("ko co token");
    } else {
      return accessToken;
    }
  } catch (error) {
    // console.warn(error.message);
    throw error;
  }
}
export async function deleteToken(name) {
  try {
    await AsyncStorage.removeItem(name);
  } catch (error) {
    throw error;
  }
}
