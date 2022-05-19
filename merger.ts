import { Tile } from "./tile";

type ShouldMergeParamsType = {
  tiles: Tile[];
  condition?: boolean;
};

export class Merger {
  static handle(tiles: Tile[]) {
    const merges = [
      { tiles: [tiles[0], tiles[1]] },
      { tiles: [tiles[0], tiles[2]], condition: tiles[1].isEmpty() },
      {
        tiles: [tiles[0], tiles[3]],
        condition: tiles[1].isEmpty() && tiles[2].isEmpty(),
      },
      { tiles: [tiles[1], tiles[2]] },
      { tiles: [tiles[1], tiles[3]], condition: tiles[2].isEmpty() },
      { tiles: [tiles[2], tiles[3]] },
    ];

    for (const merge of merges) {
      if (!Merger.shouldMerge(merge)) continue;

      merge.tiles[0].double();
      merge.tiles[1].clear();
    }
  }

  private static shouldMerge(config: ShouldMergeParamsType): boolean {
    const [first, second] = config.tiles;
    const condition = config.condition ?? true;

    return (
      condition &&
      first.hasValue() &&
      second.hasValue() &&
      first.isEqualTo(second)
    );
  }
}
