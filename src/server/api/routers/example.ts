import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input: { username, password } }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: username, password: password },
      });

      if (!user) {
        return false;
      } else {
        return true;
      }
    }),
  register: publicProcedure
    .input(
      z.object({
        username: z.string(),
        email: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ ctx, input: { username, password, email } }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: username },
      });

      if (user) {
        return false;
      }

      await ctx.prisma.user.create({
        data: {
          username,
          password,
          email,
        },
      });

      return true;
    }),
  getAllUsers: publicProcedure.input(z.object({})).query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({});

    if (!users) {
      return [];
    }

    return users
      .filter((u) => u.paidUntil !== null && u.paidUntil > new Date())
      .map((u) => ({
        id: u.id,
        username: u.username,
        email: u.email,
        paidUntil: u.paidUntil,
        diet: u.dietPlan,
        training: u.trainingPlan,
      }));
  }),
  getDayPlansListByUserId: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const dayPlan = await ctx.prisma.dayPlan.findMany({
        where: { userId: id },
      });

      return dayPlan.map((d) => ({
        id: d.id,
        date: d.date,
      }));
    }),
  getDayPlanById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input: { id } }) => {
      const dayPlan = await ctx.prisma.dayPlan.findUnique({
        where: { id: id },
      });

      return {
        text: dayPlan?.text,
      };
    }),
  setDayPlan: publicProcedure
    .input(z.object({ text: z.string(), id: z.string() }))
    .mutation(async ({ ctx, input: { text, id } }) => {
      const dayPlan = await ctx.prisma.dayPlan.update({
        where: { id: id },
        data: { text: text },
      });
    }),
  processPayment: publicProcedure
    .input(
      z.object({
        username: z.string(),
        months: z.number(),
      })
    )
    .mutation(async ({ ctx, input: { username, months } }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { username: username },
      });

      const dateUntil = new Date();
      dateUntil.setMonth(dateUntil.getMonth() + months);

      await ctx.prisma.user.update({
        where: { id: user?.id },
        data: {
          paidUntil: dateUntil,
        },
      });

      for (let d = new Date(); d <= dateUntil; d.setDate(d.getDate() + 1)) {
        await ctx.prisma.dayPlan.create({
          data: { userId: user!.id, date: d },
        });
      }

      return true;
    }),
});
