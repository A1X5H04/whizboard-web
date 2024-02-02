import { v } from "convex/values";
import { getAllOrThrow } from "convex-helpers/server/relationships";
import { query } from "./_generated/server";

export const get = query({
  args: {
    orgId: v.string(),
    search: v.optional(v.string()),
    favourite: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not Authorized");
    }

    if (args.favourite) {
      const favouriteBoards = await ctx.db
        .query("userFavorites")
        .withIndex("by_user_org", (q) =>
          q.eq("userId", identity.subject).eq("orgId", args.orgId)
        )
        .order("desc")
        .collect();

      const ids = favouriteBoards.map((board) => board.boardId);
      const boards = await getAllOrThrow(ctx.db, ids);

      return boards.map((board) => {
        return {
          ...board,
          isFavourite: true,
        };
      });
    }

    let boards = [];

    if (args.search) {
      boards = await ctx.db
        .query("boards")
        .withSearchIndex("search_title", (q) =>
          q.search("title", args.search as string).eq("orgId", args.orgId)
        )
        .collect();
    } else {
      boards = await ctx.db
        .query("boards")
        .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
        .order("desc")
        .collect();
    }

    const favouriteBoards = boards.map((board) => {
      return ctx.db
        .query("userFavorites")
        .withIndex("by_user_board", (q) =>
          q.eq("userId", identity.subject).eq("boardId", board._id)
        )
        .unique()
        .then((favourite) => {
          return {
            ...board,
            isFavourite: !!favourite,
          };
        });
    });

    const favouriteBoardsBoolean = Promise.all(favouriteBoards);
    return favouriteBoardsBoolean;
  },
});
