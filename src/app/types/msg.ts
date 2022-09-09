export interface Msg {
  user_id: number;
  username: string;
  avatar?: string;
  time: Date;
  content: string;
  isSelf?: boolean; // 前端赋值判断是否是自己
}
