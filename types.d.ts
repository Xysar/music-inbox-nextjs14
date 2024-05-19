export interface AlbumImage {
  height: number;
  width: number;
  url: string;
}
export interface Artist {
  id: string;
  name: string;
}

export interface Track {
  artists: Array<Artist>;
  duration_ms: number;
  id: string;
  name: string;
  href: string;
}

export interface Album {
  name: string;
  artists: Array<Artist>;
  images: Array<AlbumImage>;
  id: string;
  tracks: {
    items: Array<Track>;
  };
}
