import mockData from '../mock/data.json';
import type { Comment, User } from './types';

const data: { currentUser: User; comments: Comment[] } = mockData;

const mapImagesForUser = (user: User): User => {
  return {
    ...user,
    image: {
      webp: user.image.webp.split('./images/avatars/')[1],
      png: user.image.png.split('./images/avatars/')[1],
    },
  };
};

const mapImagesForComment = (comment: Comment): Comment => {
  return {
    ...comment,
    user: mapImagesForUser(comment.user),
    replies: comment.replies && comment.replies.map(mapImagesForComment),
  };
};

class CommentsService {
  public static instance: CommentsService;
  private constructor() {}

  public createComment(comment: Comment) {
    data.comments.push(comment);
  }

  public updateComment(id: number, comment: Comment) {
    const index = data.comments.findIndex((c) => c.id === id);
    data.comments[index] = comment;
  }

  public deleteComment(id: number) {
    const index = data.comments.findIndex((c) => c.id === id);
    data.comments.splice(index, 1);
  }

  public getCurrentUser() {
    return mapImagesForUser(data.currentUser);
  }
  public getComments() {
    return data.comments.map(mapImagesForComment);
  }

  public static getInstance() {
    if (!CommentsService.instance) {
      CommentsService.instance = new CommentsService();
    }
    return CommentsService.instance;
  }
}

export const useCommentsService = CommentsService.getInstance;
