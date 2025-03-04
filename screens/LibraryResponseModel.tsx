export interface LibraryResponseModel {
  status?: number;
  data?: LibraryList;
  message?: string;
  app_version?: string;
  app_update_required?: string;
}

export interface LibraryList {
  docs?: [Library];
  totalDocs: number;
  offset: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number;
  nextPage?: number;
}

export interface Library {
  id?: string;
  categoryID?: CategoryID;
  docDescription?: string;
  contentType?: LibraryContentType;
  url: string;
  thumbnailImage?: string;
  duration: string;
  fileDetails?: FileDetail;
  title?: string;
  updatedAt?: string;
}

export type LibraryContentType = 'video' | 'audio' | 'doc';

export interface CategoryID {
  id?: string;
  name?: string;
  icon?: string;
}

export interface FileDetail {
  id?: string;
  link?: string;
  name: string;
  size?: string;
  type?: string;
}