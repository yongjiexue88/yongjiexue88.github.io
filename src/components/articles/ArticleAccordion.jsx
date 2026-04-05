import "./ArticleAccordion.scss"
import React, {useEffect, useState} from 'react'
import {Accordion} from "react-bootstrap"
import Article from "/src/components/articles/base/Article.jsx"
import {useUtils} from "/src/hooks/utils.js"

function ArticleAccordion({ dataWrapper }) {
    const [selectedItemCategoryId, setSelectedItemCategoryId] = useState(null)

    return (
        <Article id={dataWrapper.uniqueId}
                 type={Article.Types.SPACING_DEFAULT}
                 dataWrapper={dataWrapper}
                 className={`article-accordion`}
                 selectedItemCategoryId={selectedItemCategoryId}
                 setSelectedItemCategoryId={setSelectedItemCategoryId}
                 forceHideTitle={true}>
            <ArticleAccordionItems dataWrapper={dataWrapper}
                                   selectedItemCategoryId={selectedItemCategoryId}/>
        </Article>
    )
}

function ArticleAccordionItems({ dataWrapper, selectedItemCategoryId }) {
    const filteredItems = dataWrapper.getOrderedItemsFilteredBy(selectedItemCategoryId)

    return (
        <Accordion className={`article-accordion-items`}>
            {filteredItems.map((itemWrapper, key) => (
                <ArticleAccordionItem itemWrapper={itemWrapper}
                                      key={key}/>
            ))}
        </Accordion>
    )
}

function ArticleAccordionItem({ itemWrapper }) {
    const utils = useUtils()

    const [bodyHtml, setBodyHtml] = useState(itemWrapper.locales.text || "")

    useEffect(() => {
        let active = true

        if(!itemWrapper.bodyPath) {
            setBodyHtml(itemWrapper.locales.text || "")
            return () => {
                active = false
            }
        }

        utils.file.loadText(itemWrapper.bodyPath).then(response => {
            if(!active) {
                return
            }

            setBodyHtml(response || itemWrapper.locales.text || "")
        })

        return () => {
            active = false
        }
    }, [itemWrapper.bodyPath, itemWrapper.locales.text])

    return (
        <Accordion.Item className={`article-accordion-item`}
                        eventKey={itemWrapper.uniqueId}>
            <Accordion.Header>
                <div className={`article-accordion-item-title eq-h6`}
                     dangerouslySetInnerHTML={{__html: itemWrapper.locales.title || itemWrapper.placeholder}}/>
            </Accordion.Header>

            <Accordion.Body>
                <div className={`article-accordion-item-body article-accordion-rich-body`}
                     dangerouslySetInnerHTML={{__html: bodyHtml}}/>
            </Accordion.Body>
        </Accordion.Item>
    )
}

export default ArticleAccordion
