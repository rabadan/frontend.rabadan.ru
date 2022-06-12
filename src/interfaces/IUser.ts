export type TAuthResponse = {
  token: string;
}

export interface IUser {
  name: string;
  email: string;
  is_admin: boolean;
}

export type TUser = {
  name: string;
  email: string;
  role: string;
}

export interface TUserResponse {
  name: string;
  email: string;
  role: string;
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