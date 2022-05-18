type TileIdType = number;
type TileValueType = number | null;

export class Tile {
  id: TileIdType;

  value: TileValueType;

  constructor(id: TileIdType, value: TileValueType = null) {
    this.id = id;
    this.value = value;
  }

  setValue(value: TileValueType): void {
    this.value = value;
  }

  isEmpty(): boolean {
    return Tile.isEmpty(this);
  }

  static isEmpty(tile: Tile): boolean {
    return tile.value === null;
  }

  hasValue(): boolean {
    return Tile.hasValue(this);
  }

  static hasValue(tile: Tile): boolean {
    return tile.value !== null;
  }
}
