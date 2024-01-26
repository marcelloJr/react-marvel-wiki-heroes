type Items = {
  name: string,
  resourceURI: string
}
type Collection = {
  available: number,
  collectionURI: string,
  items: Items[],
  returned: number
}
type Url = {
  type: string,
  url: string
}

export interface CharacterData {
  offset: number,
  limit: number,
  total: number,
  count: number,
  results: Character[]
}
export interface CharacterResponse {
  data: {
    data: CharacterData
  }
}
export default interface Character {
  id: number;
  modified: string;
  name: string;
  resourceURI: string;
  description: string;
  series: Collection;
  comics: Collection;
  events: Collection;
  stories: Collection & {type: string};
  thumbnail: {
    extension: string;
    path: string;
  };
  urls: Url[]
}