export interface BlogPostModel {
    id?: number;
    title: string;
    thumbnail: string;
    content: string;
    author: string;
    date?: string;
    categories?:[
        {
            name:string
        }
    ]
}

export interface BlogGridResponse {
    data: {
        posts: BlogPostModel[];
        totalPages: number;
    }
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    loading: boolean;
    onPageChange: (page: number) => void;
}

export interface BlogFormModel {
    itemValue: BlogPostModel;
    setVisiblePopup: (value: {
        visible: boolean,
        title: string
    }) => void;
    visiblePopup: {
        visible: boolean,
        title: string,
    },
    setTriggerRefresh?: (value: boolean) => void,
}