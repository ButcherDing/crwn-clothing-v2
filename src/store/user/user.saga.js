import { takeLatest, put, all, call } from "redux-saga/effects";

import { USER_ACTION_TYPES } from "./user.types";

import { signInSuccess, signInFailed, checkUserSession } from "./user.action";

import {
  getCurrentUser,
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInEmailPass,
} from "../../utils/firebase/firebase.utils";

export function* getSnapshotFromUserAuth(userAuth, additionalDetails) {
  try {
    // an effect is a plain object that describes what's gonna happen
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalDetails
    );
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield call(signInWithGooglePopup);
    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const response = yield call(signInEmailPass, email, password);
    console.log(response);
    const { user } = yield call(signInEmailPass, email, password);

    yield call(getSnapshotFromUserAuth, user);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromUserAuth, userAuth);
  } catch (err) {
    yield put(signInFailed(err));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* onGoogleSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onEmailSignInStart() {
  yield takeLatest(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* userSagas() {
  yield all([
    call(onCheckUserSession),
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
  ]);
}
