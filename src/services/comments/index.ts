import mockData from '../mock/data.json';
import type { Comment, CreateCommentPayload, UpdateCommentPayload, User } from './types';

function Delay(ms: number): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      return new Promise((resolve) => {
        setTimeout(() => {
          console.log('RESOLVED');
          resolve(originalMethod.apply(this, args));
        }, ms);
      });
    };
  };
}
class CommentsService {
  public static instance: CommentsService;
  private comments: Comment[] = [];
  private lastId: number = 0;
  private currentUser: User = undefined;

  private constructor() {
    const { comments, currentUser } = mockData;
    this.comments = this.applyImagesToComments(comments);
    this.lastId = this.flattenComments(comments).length;
    this.currentUser = currentUser;
  }

  public createComment(payload: CreateCommentPayload): Promise<Comment> {
    const newComment: Comment = {
      content: payload.content,
      createdAt: new Date().toISOString(),
      id: this.lastId++,
      replies: [],
      score: 0,
      user: this.currentUser,
    };

    if ('replyTo' in payload) {
      // Find the comment that this comment is replying to
      const comment = this.comments.find((c) => c.id === payload.replyTo);
      if (comment) {
        newComment.replyingTo = comment.user.username;
        comment.replies.push(newComment);
      } else {
        const comment = this.comments.find((c) => c.replies.find((r) => r.id === payload.replyTo));
        if (comment) {
          newComment.replyingTo = comment.user.username;
          comment.replies.push(newComment);
        }
      }
    } else {
      this.comments.push(newComment);
    }
    return Promise.resolve(newComment);
  }

  @Delay(1000)
  public updateComment(payload: UpdateCommentPayload): Promise<Comment> {
    let comment = this.comments.find((c) => c.id === payload.id);
    if (comment) {
      comment.content = !!payload.content && payload.content;
      comment.score = !!payload.score && payload.score;
      return Promise.resolve(comment);
    }

    comment = this.comments.find((c) => c.replies.find((r) => r.id === payload.id));
    if (comment) {
      comment.content = !!payload.content && payload.content;
      comment.score = !!payload.score && payload.score;
    }
    return Promise.resolve(comment);
  }

  @Delay(1000)
  public deleteComment(id: number): Promise<boolean> {
    return Promise.resolve(this.deleteCommentRecursively(this.comments, id));
  }

  private deleteCommentRecursively(comments, id) {
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].id === id) {
        comments.splice(i, 1);
        return true; // return true if comment is found and deleted
      } else {
        // recursively search for comment in replies
        if (comments[i].replies && comments[i].replies.length > 0) {
          const replyDeleted = this.deleteCommentRecursively(comments[i].replies, id);
          if (replyDeleted) return true;
        }
      }
    }
    return false; // return false if comment is not found
  }

  private findComment = (id: number, comments: Comment[]): Comment => {
    let comment = comments.find((c) => c.id === id);
    if (comment) {
      return comment;
    } else {
      for (const c of comments) {
        comment = this.findComment(id, c.replies);
        if (comment) {
          return comment;
        }
      }
    }
  };

  public getCurrentUser() {
    return Promise.resolve(this.currentUser);
  }

  public getComments() {
    const comments = [...this.comments];
    comments.sort((a, b) => b.score - a.score);
    return Promise.resolve(comments);
  }

  public static getInstance() {
    if (!CommentsService.instance) {
      CommentsService.instance = new CommentsService();
    }
    return CommentsService.instance;
  }

  private applyImagesToUser(user: User): User {
    return {
      ...user,
      image: {
        webp: user.image.webp.split('./images/avatars/')[1],
        png: user.image.png.split('./images/avatars/')[1],
      },
    };
  }

  private applyImagesToComments(comments: Comment[]): Comment[] {
    return comments.map((comment) => {
      return {
        ...comment,
        user: this.applyImagesToUser(comment.user),
        replies: comment.replies && this.applyImagesToComments(comment.replies),
      };
    });
  }

  private flattenComments(comments: Comment[]): Comment[] {
    return comments.reduce((acc, comment) => {
      return [...acc, comment, ...this.flattenComments(comment.replies)];
    }, [] as Comment[]);
  }
}

export const useCommentsService = CommentsService.getInstance;
