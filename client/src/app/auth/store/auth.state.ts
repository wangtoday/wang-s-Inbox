export interface AuthState {
  status: boolean;
  user: any; //TODO: 后面这个地方可以改成一个真实的user type
}

/**
 * 默认的初始状态,
 * 用户没有登录,
 * 用户对象为nullÍ
 */
export const initialState: AuthState = {
  status: false,
  user: null
};
