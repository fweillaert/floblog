import { integer, text, timestamp, pgTable, primaryKey, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const articles = pgTable("articles", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: text().notNull(),
    body: text().notNull(),
    createdAt: timestamp().notNull().defaultNow(),
    updatedAt: timestamp().notNull().defaultNow(),
});

export const images = pgTable("images", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    articleId: integer().notNull().references(() => articles.id),
    uuid: uuid().notNull().defaultRandom(),
    createdAt: timestamp().notNull().defaultNow(),
});

export const imagesRelations = relations(images, ({ one }) => ({
    author: one(articles, {
        fields: [images.articleId],
        references: [articles.id],
    }),
}));

export const tags = pgTable("tags", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
})


export const tagsToArticles = pgTable(
    'tags_to_articles',
    {
        tagId: integer().notNull().references(() => tags.id),
        articleId: integer().notNull().references(() => articles.id),
    },
    (t) => [
        primaryKey({ columns: [t.tagId, t.articleId] })
    ],
);

export const tagsToArticlesRelations = relations(tagsToArticles, ({ one }) => ({
    articles: one(articles, {
        fields: [tagsToArticles.articleId],
        references: [articles.id],
    }),
    tag: one(tags, {
        fields: [tagsToArticles.tagId],
        references: [tags.id],
    }),
}));
