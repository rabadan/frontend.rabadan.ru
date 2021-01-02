export interface IUser {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export type TUser = {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export interface TUserResponse {
  id: string;
  name: string;
  email: string;
  accessToken: string;
}

export interface IOauthParams {
  service: string;
  service_id: string;
  service_email: string;
  token: string;
  name: string;
  user_id?: string;
}

export interface TUserFacebookResponse {
  accessToken: string;
  data_access_expiration_time: bigint;
  email: string;
  expiresIn: bigint;
  graphDomain: string;
  id: string;
  userID: string;
  name: string;
  signedRequest: string;
}

export interface TUserGoogleResponse {
  tokenId: string;
  profileObj: {
    email: string;
    name: string;
    googleId: string;
  }
}

export interface TUserVkResponse {
  session: {
    user: {
      domain: string;
      first_name: string;
      last_name: string;
      href: string;
      id: string;
    }
  },
  status: string
}