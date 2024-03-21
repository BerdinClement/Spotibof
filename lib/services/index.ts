import { artist, tag } from "@/types";

export async function getTopArtists(page: number = 1) {
  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?format=json&method=chart.getTopArtists&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    {
      method: "GET",
      redirect: "follow",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  if (res.error) {
    return {
      message: res.message,
      status: "error",
    };
  }

  // console.log("tset");
  // console.log(res.artists.artist[0]);

  res.artists.artist.map(async (artist: artist) => {
    artist.tags = await getArtistTags(artist.name);
  });

  return res.artists.artist;
}
export async function getTopAlbums(mbid: string, page: number = 1) {
  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getTopAlbums&mbid=${mbid}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    {
      method: "GET",
      redirect: "follow",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  if (res.error) {
    return {
      message: res.message,
      status: "error",
    };
  }

  return res.topalbums.album;
}

export async function getImg(mbid: string, page: number = 1) {
  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getTopAlbums&mbid=${mbid}&api_key=${process.env.NEXT_PUBLIC_API_KEY}&page=${page}`,
    {
      method: "GET",
      redirect: "follow",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  if (res.error) {
    return {
      message: res.message,
      status: "error",
    };
  }
  const imageUrl = res.topalbums.album[0].image[2]["#text"];
  // console.log("---");
  // console.log(imageUrl);
  return imageUrl;
}

export async function getArtistTags(artist: string) {
  // console.log(encodeURI(artist));

  const res = await fetch(
    `http://ws.audioscrobbler.com/2.0/?format=json&method=artist.getTopTags&artist=${encodeURI(
      artist
    )}&api_key=${process.env.NEXT_PUBLIC_API_KEY}`,
    {
      method: "GET",
      redirect: "follow",
      next: {
        revalidate: 60,
      },
    }
  )
    .then((response) => response.json())
    .catch((error) => console.log("error", error));

  if (res.error) {
    return {
      message: res.message,
      status: "error",
    };
  }

  return res.toptags.tag.filter((tag: any) => tag.count == 100);
}
