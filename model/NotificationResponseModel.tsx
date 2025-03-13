import {FileDetail, LibraryContentType} from './LibraryResponseModel';

export interface NotificationResponseModel {
  status?: number;
  data?: NotificationData;
  message?: string;
}
export interface NotificationData {
  docs?: [Notifications];
  totalDocs: number;
  offset: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  prevPage: number;
  nextPage: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
}

export interface Notifications {
  message: string;
  catalogueID: NotificationDetailedData;
  title: string;
  msgType: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
  id: string;
}

export interface NotificationDetailedData {
  id: string;
  title: string;
  icon: string;
  contentType: LibraryContentType;
  url: string;
  thumbnailImage: string;
  fileDetails: FileDetail;
}
