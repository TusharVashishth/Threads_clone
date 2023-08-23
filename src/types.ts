type UserAvatarTye = {
  name: string;
  image?: string;
};

type AuthStateType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
  password_confirmation?: string;
};

type AuthErrorType = {
  name?: string;
  email?: string;
  username?: string;
  password?: string;
};

type PostErrorType = {
  content?: string;
  image?: string;
};

// * Post type
type User = {
  id: number;
  name: string;
  username: string;
  email?: string;
  image?: string;
};

type PostType = {
  id: number;
  user_id: number;
  content: string;
  image?: string;
  comment_count: number;
  like_count: number;
  created_at: string;
  user: User;
  Likes: Array<PostLikeType> | [];
};

type CommentType = {
  id: number;
  user_id: number;
  post_id: number;
  content: string;
  created_at: string;
  user: User;
};

type NotificationType = {
  id: number;
  user_id: number;
  toUser_id: number;
  content: string;
  created_at: string;
  user: User;
};

type ShowUserType = {
  name: string;
  id: string;
  email: string;
  username: string;
  image: string;
  Post: Array<PostType> | [];
  Comment: Array<CommentType> | [];
};

type LikeType = {
  post_id: string;
  toUserId: string;
  status: string;
};

type PostLikeType = {
  id: number;
  post_id: number;
  user_id: number;
};
