import { Injectable } from "@angular/core";

const BACKEND_URL = `http://localhost:8888`;

@Injectable({
  providedIn: "root"
})
export class UrlService {
  constructor() {}

  static QUESTION = {
    GET_LIST: (page: string) => `${BACKEND_URL}/question/list/${page}`,
    OPTIONS_ITEM: (tid: string) => `${BACKEND_URL}/question/item/${tid}`,
    POST_CREATE: `${BACKEND_URL}/question/item`
  };

  static USER = {
    GET_INFO: (username: string) => `${BACKEND_URL}/user/info/${username}`,
    AVATAR: (uid: string) => `${BACKEND_URL}/user/avatar/${uid}`,
    GET_MY: `${BACKEND_URL}/user/my`,
    GET_TOKEN: `${BACKEND_URL}/user/token`,
    POST_CHANGE_AVATAR: `${BACKEND_URL}/user/my/avatar`,
    POST_LOGIN: `${BACKEND_URL}/user/login`,
    POST_REGISTER: `${BACKEND_URL}/user/register`
  };

  static SUBMISSION = {
    GET_USER_LIST: (uid: string, page: string) => `${BACKEND_URL}/submission/list/${uid}/${page}`,
    GET_DETAIL: (sid: string) => `${BACKEND_URL}/submission/detail/${sid}`,
    GET_CODE: (sid: string) => `${BACKEND_URL}/submission/code/${sid}`,
    GET_LANGUAGE: `${BACKEND_URL}/submission/language`
  };
}
