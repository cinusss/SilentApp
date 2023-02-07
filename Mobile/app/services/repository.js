import {showAlert, showAlertBug} from '../services/errorHandler';
import {baseUrl, refresh} from '../consts/constans';
import AsyncStorage from '@react-native-community/async-storage';
import NetInfo from '@react-native-community/netinfo';

export async function asyncEmptyPost(object, url, retries = 0) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ApplicationType: 1,
    },
    body: object,
  };

  return await fetch(baseUrl + url, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.statusCode < 300) {
        return JSON.stringify({status: true, data: responseJson});
      } else if (
        responseJson.statusCode === 404 ||
        responseJson.statusCode === 401 ||
        responseJson.statusCode === 400
      ) {
        if (responseJson.returnMessage == null) {
          return JSON.stringify({
            status: false,
            message: responseJson.errors.Password[0],
          });
        }
        return JSON.stringify({
          status: false,
          message: responseJson.returnMessage,
        });
      } else if (responseJson.statusCode >= 500) {
        showAlertBug();
      }
    })
    .catch(() => {
      if (retries < 4) {
        setTimeout(() => {
          return asyncEmptyPost(object, url, retries + 1);
        }, Math.pow(1.1, retries + 1) * 1000);
      } else {
        showAlert();
      }
    });
}

export async function asyncEmptyLoggedPost(object, url, retries = 0) {
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ApplicationType: 1,
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    },
    body: object,
  };

  return await fetch(baseUrl + url, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.statusCode < 400) {
        return JSON.stringify({status: true, data: responseJson});
      } else if (
        responseJson.statusCode === 401 ||
        responseJson.statusCode === 404 ||
        responseJson.statusCode === 400
      ) {
        if (responseJson.returnMessage == null) {
          return JSON.stringify({
            status: false,
            message: responseJson.errors.Password[0],
          });
        }
        return JSON.stringify({
          status: false,
          message: responseJson.returnMessage,
        });
      } else if (responseJson.statusCode >= 500) {
        showAlertBug();
      }
    })
    .catch(() => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          if (retries < 4) {
            setTimeout(() => {
              return asyncEmptyLoggedPost(object, url, retries + 1);
            }, Math.pow(1.5, retries + 1) * 1000);
          } else {
            showAlert();
          }
        }
      });
    });
}

export async function asyncEmptyLoggedDelete(object, url, retries = 0) {
  const options = {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ApplicationType: 1,
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    },
    body: object,
  };

  return await fetch(baseUrl + url, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.statusCode < 300) {
        return JSON.stringify({status: true, data: responseJson});
      } else if (
        responseJson.statusCode === 401 ||
        responseJson.statusCode === 404 ||
        responseJson.statusCode === 400
      ) {
        return JSON.stringify({
          status: false,
          message: responseJson.returnMessage,
        });
      } else if (responseJson.statusCode >= 500) {
        showAlertBug();
      }
    })
    .catch(() => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          if (retries < 4) {
            setTimeout(() => {
              return asyncEmptyLoggedDelete(object, url, retries + 1);
            }, Math.pow(1.5, retries + 1) * 1000);
          } else {
            showAlert();
          }
        }
      });
    });
}

export async function asyncEmptyLoggedGet(url, query = '', retries = 0) {
  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ApplicationType: 1,
      Authorization: 'Bearer ' + (await AsyncStorage.getItem('token')),
    },
  };
  return await fetch(baseUrl + url + query, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.statusCode < 300) {
        return responseJson;
      } else if (
        responseJson.statusCode === 404 ||
        responseJson.statusCode === 401 ||
        responseJson.statusCode === 400
      ) {
        return JSON.stringify({
          status: false,
          message: responseJson.returnMessage,
        });
      } else if (responseJson.statusCode >= 500) {
        showAlertBug();
      }
    })
    .catch(() => {
      NetInfo.fetch().then(state => {
        if (!state.isConnected) {
          if (retries < 4) {
            setTimeout(() => {
              return asyncEmptyLoggedGet(url, query, retries + 1);
            }, Math.pow(1.5, retries + 1) * 1000);
          } else {
            showAlert();
          }
        }
      });
    });
}

export async function asyncRefreshToken(retries = 0) {
  const userId = parseInt(await AsyncStorage.getItem('userId'), 10);
  const refreshToken = await AsyncStorage.getItem('refresh');
  if (userId == null || refreshToken == null) {
    return false;
  }
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ApplicationType: 1,
      Refresh: refreshToken,
    },
    body: JSON.stringify({
      userId: userId,
    }),
  };
  return await fetch(baseUrl + refresh, options)
    .then(response => response.json())
    .then(responseJson => {
      if (responseJson.statusCode < 300) {
        AsyncStorage.setItem('token', responseJson.token.toString());
        AsyncStorage.setItem('refresh', responseJson.refreshOut.toString());
        return responseJson;
      }
      if (responseJson.statusCode === 401) {
        return false;
      } else if (responseJson.statusCode >= 500) {
        showAlertBug();
      }
    })
    .catch(() => {
      NetInfo.fetch().then(state => {
        if (state.isConnected) {
          setTimeout(() => {
            return asyncRefreshToken(retries + 1);
          }, Math.pow(1.1, retries + 1) * 1000);
        } else {
          showAlert();
        }
      });
    });
}
