/**
 * 로그인시 필요한 POST JSON
 */
export type LoginReqType = {
  email: string;
  password: string;
};

/**
 * 회원가입시 필요한 POST JSON
 */
export type SignupReqType = {
  nickname: string;
  email: string;
  password: string;
}

/**
 * 좋아요시 필요한 값
 */
export type LikeBookReqType = {
  email: string;
  title: string;
  author: string;
  smallImageUrl: string;
}

/**
 * VideoKey
 */
export type VideoKeyReqType = {
  language: string;
  text: string;
  model: string;
  clothes: number;
  token: string;
}

/**
 * FindProject
 */
export type FindProjectReqType = {
  key: string;
  token: string;
}
