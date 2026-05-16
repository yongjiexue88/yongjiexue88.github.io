import React from 'react'
import {ArticlePostCollection} from "/src/components/articles/ArticleBlog.jsx"

const bookNoteModules = import.meta.glob("/src/content/booknotes/**/*.mdx", {
    eager: true,
    query: "?raw",
    import: "default"
})

function ArticleBookNotes({ dataWrapper }) {
    return (
        <ArticlePostCollection dataWrapper={dataWrapper}
                               modules={bookNoteModules}
                               contentRoot={`/src/content/booknotes/`}
                               backLabel={`All book notes`}/>
    )
}

export default ArticleBookNotes
