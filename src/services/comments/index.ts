import type { Comment, User } from './types';
import mockData from '../mock/data.json';

const data: { currentUser: User; comments: Comment[] } = mockData;

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
    return data.currentUser;
  }
  public getComments() {
    return data.comments;
  }

  public static getInstance() {
    if (!CommentsService.instance) {
      CommentsService.instance = new CommentsService();
    }
    return CommentsService.instance;
  }
}

export const useCommentsService = CommentsService.getInstance;
