export type LoginReqType = {
  email: string;
  password: string;
};

export type SignupReqType = {
  nickname: string;
  email: string;
  password: string;
}

export type LikeBookReqType = {
  email: string;
  title: string;
  author: string;
  smallImageUrl: string;
}