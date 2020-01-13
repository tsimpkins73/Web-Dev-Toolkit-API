

const ArticlesService = {
    getAllResources(knex) {
        return knex.select('*').from('resources')
    },
    getAllTypes(knex) {
        return knex.select('*').from('types')
    },


   getResourcesByTypeId(knex, categoryId) {
    console.log(categoryId)     
    return knex.from('resources')
         .join('resource_types','resource_id', 'resources.id')
         .where('type_id', typeId)
         .select('*')
     },

    getArticleById(knex, id) {
        return knex.from('articles').select('*').where('id', id).first()
    },

    getArticleComments(knex, id) {
        return knex.from('comments').select('*').where('article_id', id)
    },


    /*  INSERTS  */

    insertArticle(knex, newArticle) {
        return knex
            .insert(newArticle)
            .into('articles')
            .returning('*')
            .then(([article]) => article)
    },

    insertArticleCategory(knex, newArticleCategory) {
        return knex
            .insert(newArticleCategory)
            .into('article_categories')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },

    insertComment(knex, newComment) {
        return knex
            .insert(newComment)
            .into('comments')
            .returning('*')
            .then(rows => {
                return rows[0]
            })
    },


    serializeArticle(article) {
        return {
          headline:xss(article.headline),
          url:xss(article.url),
          summary:xss(article.summary),
          text:xss(article.text),
          image:xss(article.image),
          favorite: article.favorite,
          user_id: article.user_id
        }
      },

    /* DELETES */

    deleteArticle(knex, id) {
        return knex('articles')
            .where({ id })
            .delete()
    },

    deleteComment(knex, id) {
        console.log(id)
        return knex.from('comments')
        .select('*')
            .where('id', id )
            .delete()
    },

    deleteUser(knex, id) {
        return knex('users')
            .where({ id })
            .delete()
    },

/* UPDATES */

    updateArticle(knex, id, newArticleFields) {
        return knex('articles')
            .where({ id })
            .update(newArticleFields)
    },

    updateComment(knex, id, newArticleFields) {
        return knex('articles')
            .where({ id })
            .update(newArticleFields)
    },
}

module.exports = ArticlesService