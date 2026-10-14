import { Elysia, t } from "elysia";
import { db } from "../db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const routes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    return await db.select().from(users);
  })
  .get("/:id", async ({ params: { id }, set }) => {
    const numId = Number(id);
    if (isNaN(numId)) {
      set.status = 400;
      return { error: "ID tidak valid" };
    }

    const [user] = await db.select().from(users).where(eq(users.id, numId));
    if (!user) {
      set.status = 404;
      return { error: "User tidak ditemukan" };
    }

    return user;
  })
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const [newUser] = await db.insert(users).values(body).returning();
        set.status = 201;
        return newUser;
      } catch (err: any) {
        set.status = 400;
        return { error: err.message || "Gagal membuat user" };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
      }),
    }
  )
  .put(
    "/:id",
    async ({ params: { id }, body, set }) => {
      const numId = Number(id);
      if (isNaN(numId)) {
        set.status = 400;
        return { error: "ID tidak valid" };
      }

      try {
        const [updatedUser] = await db
          .update(users)
          .set(body)
          .where(eq(users.id, numId))
          .returning();

        if (!updatedUser) {
          set.status = 404;
          return { error: "User tidak ditemukan" };
        }

        return updatedUser;
      } catch (err: any) {
        set.status = 400;
        return { error: err.message || "Gagal memperbarui user" };
      }
    },
    {
      body: t.Partial(
        t.Object({
          name: t.String(),
          email: t.String(),
        })
      ),
    }
  )
  .delete("/:id", async ({ params: { id }, set }) => {
    const numId = Number(id);
    if (isNaN(numId)) {
      set.status = 400;
      return { error: "ID tidak valid" };
    }

    const [deletedUser] = await db
      .delete(users)
      .where(eq(users.id, numId))
      .returning();

    if (!deletedUser) {
      set.status = 404;
      return { error: "User tidak ditemukan" };
    }

    return { message: "User berhasil dihapus", user: deletedUser };
  });
