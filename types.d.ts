export interface AlbumImage {
  "#text": string;
  size: string;
}

export interface Album {
  name: string;
  artist: string;
  image: Array<AlbumImage>;
  mbid: string;
}
