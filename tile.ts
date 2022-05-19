type TileIdType = number;
type TileValueType = number | null;

export class Tile {
  id: TileIdType;

  value: TileValueType;

  static newlySpawnedValue = 2;

  constructor(id: TileIdType, value: TileValueType = null) {
    this.id = id;
    this.value = value;
  }

  setValue(value: TileValueType): void {
    this.value = value;
  }

  double() {
    if (this.value === null) return;

    this.value = this.value * 2;
  }

  clear() {
    this.value = null;
  }

  copyFrom(tile: Tile) {
    this.value = tile.value;
  }

  isEmpty(): boolean {
    return Tile.isEmpty(this);
  }

  isEqualTo(tile: Tile): boolean {
    if (this.isEmpty() || tile.isEmpty()) return false;
    return this.value === tile.value;
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
