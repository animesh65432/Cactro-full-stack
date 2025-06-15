export interface Video {
    id: string;
    snippet: {
        title: string;
        description: string;
        thumbnails: {
            maxres?: { url: string };
            high?: { url: string };
            medium?: { url: string };
        };
        publishedAt: string;
        channelTitle: string;
    };
    statistics: {
        viewCount: string;
        likeCount: string;
        commentCount: string;
    };
}


export interface Comment {
    id: string;
    authorDisplayName: string;
    authorProfileImageUrl: string;
    text: string;
    publishedAt: string;
}


export interface Note {
    id: string;
    content: string;
    tags: string[];
}
