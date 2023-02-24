export interface Image {
  /**
   * The url of the image in png format
   */
  png?: string;
  /**
   * The url of the image in webp format
   */
  webp?: string;
}

export interface User {
  /**
   * The image of the user
   */
  image: Image;
  /**
   * The name of the user
   */
  username: string;
}

/**
 * Interface that represents a comment
 */
export interface Comment {
  /**
   * The id of the comment
   */
  id: number;
  /**
   * The content of the comment
   */
  content: string;
  /**
   * The date the comment was created
   */
  createdAt: string;
  /**
   * The score of the comment
   */
  score: number;
  /**
   * The user that created the comment
   */
  user: User;

  /**
   * The replies to this comment
   */
  replies: Comment[];

  /**
   * The id of the comment that this comment is replying to
   */
  replyingTo?: string;
}

/**
 * The payload for creating a new comment
 */
export interface CreateCommentPayload {
  /**
   * The content of the comment
   */
  content: string;
  /**
   * The id of the comment that this comment is replying to
   */
  replyTo?: number;
}

/**
 * The payload for creating a new comment
 */
export interface UpdateCommentPayload {
  /**
   * The id of the comment to update
   */
  id: number;
  /**
   * The content of the comment
   */
  content?: string;
  /**
   * The score of the comment
   */
  score?: number;
}
