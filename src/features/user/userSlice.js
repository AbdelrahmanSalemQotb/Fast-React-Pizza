import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { getAddress as fetchAddressFromGeo } from "../../services/apiGeocoding";

function getGeolocationPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAddress",
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getGeolocationPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await fetchAddressFromGeo(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    return { position, address };
  },
);

const initialState = {
  username: "",
  state: "idle",
  address: "",
  position: {},
  error: "",
};
const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    changeUsername(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, function (state) {
        state.status = "loading";
      })
      .addCase(fetchAddress.rejected, function (state, action) {
        console.log(action, action.error.message);
        state.status = "error";
        state.error = `There was a problem getting your address "${action.error.message}". Make sure to fill this field!`;
        state.address = "";
        state.position = {};
      })
      .addCase(fetchAddress.fulfilled, function (state, action) {
        state.status = "idle";
        state.address = action.payload.address;
        state.position = action.payload.position;
      });
  },
});

export default userSlice.reducer;
export const { changeUsername } = userSlice.actions;

export const getUser = (store) => store.user;
export const getUsername = (store) => store.user.username;
export const getAddress = (store) => store.user.address;
export const getPosition = (store) => store.user.position;
export const getState = (store) => store.user.state;
export const getIsLoading = (store) => store.user.state === "loading";
