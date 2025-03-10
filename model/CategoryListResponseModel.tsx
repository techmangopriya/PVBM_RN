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