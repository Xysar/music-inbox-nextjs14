import { Prisma } from "@prisma/client";
type TrackReviewWithTrackAlbums = Prisma.TrackReviewGetPayload<{
  include: { track: { include: { album: true } } };
}>;

type TrackReviewWithUser = Prisma.TrackReviewGetPayload<{
  include: { user: true };
}>;
type TrackWithReviewsUsers = Prisma.TrackGetPayload<{
  include: { trackReviews: { include: { user: true } } };
}>;

type AlbumWithRelations = Prisma.AlbumGetPayload<{
  include: {
    tracks: {
      trackReviews: {
        user: true;
      };
    };
  };
}>;
export interface SpotifyAlbumImage {
  height: number;
  width: number;
  url: string;
}
export interface SpotifyArtist {
  id: string;
  name: string;
}

export interface SpotifyTrack {
  artists: Array<Artist>;
  duration_ms: number;
  id: string;
  name: string;
  href: string;
}

export interface SpotifyAlbum {
  name: string;
  artists: Array<Artist>;
  images: Array<AlbumImage>;
  id: string;
  tracks: {
    items: Array<Track>;
  };
}
