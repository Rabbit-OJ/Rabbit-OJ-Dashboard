import { Injectable } from "@angular/core";

// const BACKEND_URL = `https://oj.6rabbit.com/api`;
const BACKEND_URL = `http://localhost:8888`;
const BACKEND_SOCKET_URL = BACKEND_URL.replace(/^http/, "ws");

@Injectable({
  providedIn: "root"
})
export class UrlService {
  constructor() {}

  static QUESTION = {
    GET_LIST: (page: string) => `${BACKEND_URL}/question/list/${page}`,
    OPTIONS_ITEM: (tid: string) => `${BACKEND_URL}/question/item/${tid}`,
    POST_CREATE: `${BACKEND_URL}/question/item`,
    SUBMIT: (tid: string) => `${BACKEND_URL}/question/submit/${tid}`,
    RECORD: (tid: string, page: string) => `${BACKEND_URL}/question/record/${tid}/${page}`
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
    POST_CODE: (sid: string) => `${BACKEND_URL}/submission/code/${sid}`,
    GET_LANGUAGE: `${BACKEND_URL}/submission/language`,
    SOCKET: (sid: string) => `${BACKEND_SOCKET_URL}/ws/${sid}`
  };

  static CONTEST = {
    GET_LIST: (page: string) => `${BACKEND_URL}/contest/list/${page}`,
    GET_MY_INFO: (cid: string) => `${BACKEND_URL}/contest/my/info/${cid}`,
    GET_SCORE_BOARD: (cid: string, page: string) => `${BACKEND_URL}/contest/scoreboard/${cid}/${page}`,
    GET_INFO: (cid: string) => `${BACKEND_URL}/contest/info/${cid}`,
    GET_QUESTIONS: (cid: string) => `${BACKEND_URL}/contest/question/${cid}`,
    POST_REGISTER: (cid: string, operation: "cancel" | "reg") => `${BACKEND_URL}/contest/register/${cid}/${operation}`
  };
}
