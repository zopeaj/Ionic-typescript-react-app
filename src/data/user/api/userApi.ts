import { User, IUserCreate, IUserUpdate, UserLogin, UserLogout } from "../../../models/User";
const apiUserUrl = 'http://localhost:8081/api/v1/user';
const locationUrl = 'http://localhost:8081/api/v1/location';
const apiLoginUrl = 'http://localhost:8081/auth/login';
const apiLogoutUrl = 'http://localhost:8081/auth/logout';

const HAS_LOGGED_IN = 'hasLoggedIn';
const HAS_ISADMIN = 'hasIsAdmin';
const USERNAME = 'username';


export const createUserData = async (data: IUserCreate) => {
  var responseData: any = { };
  const response = await fetch(apiUserUrl, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json"
    }
  })
    .then((data) => data.text())
    .then((result) => {
      responseData["result"] = result;
    })
    .catch((error) => {
      responseData["error"] = error;
    });
  return responseData;
}

export const updateUserData = async (data: IUserUpdate, id: number) => {
  const response = await fetch(apiUserUrl + `/${id}`, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      ContentType: "application/json"
    }
  });
  const userUpdateData = await response.data;
  return userUpdateData;
}

export const deleteUserData = async (id: number) => {
  const response = await fetch(apiUserUrl + `/${id}`, {
    method: "DELETE",
    headers: {
      ContentType: "application/json"
    }
  });
  const userDeleteData = await response.data;
  return userDeleteData;
}

export const getUserDatas = async () => {
  const response = await fetch(apiUserUrl, {
    method: "GET",
    headers: {
      ContentType: "application/json"
    }
  });
  return response.data;
}

export const loginUser = async (data: UserLogin) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", data.username);
  urlencoded.append("password", data.password);

  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded")

  var requestOptions = {
    method: 'GET',
    headers: headers,
    body: urlencoded
  }

  var responseData: any = { };

  await fetch(apiLogoutUrl, requestOptions)
    .then(data => data.text())
    .then(result => {
      responseData.result = result;
    })
    .catch(error => {
      responseData["error"] = error;
    });

   return responseData;
}

export const logoutUser = async (data: UserLogout) => {
  var urlencoded = new URLSearchParams();
  urlencoded.append("username", data.username);
  var headers = new Headers();
  headers.append("Content-Type", "application/x-www-form-urlencoded");
  var responseData: any  = { };
  var requestOptions = {
    method: 'GET',
    headers: headers,
    body: urlencoded
  }
  await fetch(apiLogoutUrl, requestOptions)
    .then(data => data.text())
    .then(result => {
      responseData["result"] = result;
    })
    .catch(error => {
      responseData["error"] = error;
    });
    return responseData;
}
