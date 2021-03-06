import { Tile } from "./tile";

type ShouldMoveParamsType = {
  target: Tile;
  source: Tile;
  condition?: boolean;
};

export class Mover {
  static handle(tiles: Tile[]) {
    const moves = Mover.getMoves(tiles);

    for (const move of moves) {
      if (!Mover.shouldMove(move)) continue;

      move.target.copyFrom(move.source);
      move.source.clear();
    }
  }

  static simulate(tiles: Tile[]): boolean {
    const moves = Mover.getMoves(tiles);
    return moves.filter(Mover.shouldMove).length > 0;
  }

  private static getMoves(tiles: Tile[]) {
    return [
      { target: tiles[0], source: tiles[1] },
      { target: tiles[0], source: tiles[2], condition: tiles[1].isEmpty() },
      {
        target: tiles[0],
        source: tiles[3],
        condition:
          tiles[0].isEmpty() && tiles[1].isEmpty() && tiles[2].isEmpty(),
      },
      { target: tiles[1], source: tiles[2] },
      { target: tiles[1], source: tiles[3], condition: tiles[2].isEmpty() },
      { target: tiles[2], source: tiles[3] },
    ];
  }

  private static shouldMove(config: ShouldMoveParamsType): boolean {
    const condition = config.condition ?? true;

    return condition && config.target.isEmpty() && config.source.hasValue();
  }
}
