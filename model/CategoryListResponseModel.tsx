import {CategoryID, Library} from './LibraryResponseModel';

export interface CategoryListResponseModel {
  status: number;
  data: CategoryList;
  message: string;
  appVersion: string;
  app_update_required: string;
}

export interface CategoryList {
  docs: [LibraryCategory];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number;
  nextPage: number;
}

export interface LibraryCategory {
  id: string;
  name: string;
  icon: string;
  audioPosts: [string];
  videoPosts: [string];
  docPosts: [string];
}

class PlayerItem {
  title: string;
  categoryName: string;
  dateCreated: string;
  url: string;
  desc: string;
  icon: string;

  constructor(library: Library) {
  console.log(library.docDescription ?? "");
    this.title = library.title ?? "Unknown Title";
    this.categoryName = library.categoryId?.name ?? "Unknown Category";
    this.icon = library.categoryId?.icon ?? "defaultIcon.png";
    this.dateCreated = library.updatedAt ?? 'unknown date';
    this.url = library.url ?? "Unknown URL";
    this.desc = library.description ?? "No description available";
  }

  private formatDate(date: string): string {
    if (!date) return "Unknown Date";
    const formattedDate = new Date(date);
    return isNaN(formattedDate.getTime()) ? "Invalid Date" : formattedDate.toLocaleDateString();
  }
}

export default PlayerItem;