import { useState, useEffect, useContext, useRef } from "react"
import { useParams } from "react-router-dom"
import { AuthTokenContext } from "../../../pages/Editor"
import axios from "axios"
import { baseURL } from "../../../services/config"
import PostBody from "../../Posts/PostBody"
import { Page } from "../../../types"
import { resBodyToPostBody } from "../../../helpers/postbody"

// A page can or not be in the navigation links. 
// A page that is on the navigation sublinks can be displayed alone or with its sibling sublinks

// Strapi requires multiple requests to create the nav-pages relations
// First navlinks and their sublinks are requested
// Then, for each sublink there is another request to get the page it links

interface NavLink {
  id: number
  pagina?: {
    id: number // Page id
  }
  subenlaces: {
    id: number,
    unapagina: boolean
  }[]
}

const PagesPreview = () => {
  const { id } = useParams()
  const authToken = useContext(AuthTokenContext)

  const [page, setPage] = useState<{ page?: Page, subpages?: Page[] }>({})

  useEffect(() => {
    getNavlinks(authToken).then((navlinks) => {


      navlinks.forEach(navlink => {

        // FIXME: el problema es que cuando hay sublinks aunque tenga los sublinks al final se sobreescriben con page porque page tarda más. Tengo que hacer que primero tome page y luego sublinks para tenerlo todo junto.
        // He hecho la prueba: previendo un sublink se muestra primero la página de ese sublink y enseguida se cambia a la pagina de navegación

        // Nav page
        if (navlink.pagina && navlink.pagina.id.toString() === id) {

          if (navlink.subenlaces.length === 0) {

            // Preview page doesn't have sublinks
            getPage(authToken, navlink.pagina?.id).then(pageRes => { setPage({ page: pageRes }) })

          } else {

            // Preview page has sublinks
            getPage(authToken, navlink.pagina.id).then(pageRes => {
              const onepageSublinks = navlink.subenlaces.filter(sublink => sublink.unapagina)

              if (onepageSublinks.length > 0) {
                getSublinkPages(authToken, onepageSublinks).then(sublinkPages => {
                  const sublinkPagesIds = sublinkPages.map(sublinkpage => sublinkpage.id)
                  getSubpages(authToken, sublinkPagesIds).then(subpages => {
                    setPage({ page: pageRes, subpages: subpages })
                  })
                })
              } else {
                setPage({ page: pageRes })
              }
            })
          }
          return
        }

        // TODO: set page and subpages at same time to avoid problems

        // Preview page could be a subpage
        navlink.subenlaces.forEach(sublink => {

          getSublinkPage(authToken, sublink.id).then(res => {
            if (res.id.toString() === id) {

              if (sublink.unapagina) {

                if (navlink.pagina) {
                  getPage(authToken, navlink.pagina.id).then(pageRes => { setPage(p => ({ ...p, page: pageRes })) })
                }

                const onepageSublinks = navlink.subenlaces.filter(sublink => sublink.unapagina)

                if (onepageSublinks.length > 0) {
                  getSublinkPages(authToken, onepageSublinks).then(sublinkPages => {
                    const sublinkPagesIds = sublinkPages.map(sublinkpage => sublinkpage.id)
                    getSubpages(authToken, sublinkPagesIds).then(subpages => {
                      setPage(prevState => ({ ...prevState, subpages: subpages }))
                    })
                  })
                }

              } else {
                // Subpage will render alone 
                getPage(authToken, res.id).then(pageRes => { setPage({ page: pageRes }) })
              }
            }
          })

        })
      })

      // Pages not included in navigation links display on their own
      if (id) {
        getPage(authToken, parseInt(id)).then(pageRes => { setPage({ page: pageRes }) })
      }
    })
  }, [id])

  if (!page.page && !page.subpages) {
    return <main></main>
  }

  return (
    <main className="main newspage">
      {page.page ? (
        <header>
          <h2>{page.page.titulo}</h2>
        </header>
      ) : null}
      <article className="article">
        {page.page?.cuerpo ? <PostBody body={resBodyToPostBody(page.page.cuerpo)} /> : null}
        {page.subpages?.map(subpage => (
          <>
            <h3>{subpage.titulo}</h3>
            <PostBody body={resBodyToPostBody(subpage.cuerpo)} />
          </>
        ))}
      </article>
    </main>
  )
}

export default PagesPreview

const getNavlinks = async (authToken: string) => {
  const res = await axios.get(baseURL + "/content-manager/collection-types/api::nav-link.nav-link", {
    headers: { Authorization: `Bearer ${authToken}` }
  })
  const navlinks = res.data.results as NavLink[]
  return navlinks
}

const getSublinkPages = (authToken: string, sublinks: { id: number }[]) => {
  const promises = sublinks.map(sublink => {
    return getSublinkPage(authToken, sublink.id)
  })

  return Promise.all(promises).then(data => {
    return data.sort((a, b) => {
      const indexA = sublinks.indexOf(a)
      const indexB = sublinks.indexOf(b)
      return indexA - indexB
    })
  })
}

const getSublinkPage = async (authToken: string, sublinkId: number) => {
  const res = await axios.get(baseURL + "/content-manager/relations/nav.sublink/" + sublinkId + "/pagina", {
    headers: { Authorization: `Bearer ${authToken}` }
  })
  return res.data.data as { id: number }
}

const getPage = async (authToken: string, pageId: number) => {
  const res = await axios.get(baseURL + "/content-manager/collection-types/api::page.page/" + pageId, {
    headers: { Authorization: `Bearer ${authToken}` }
  })
  return res.data as (Page & { id: number })
}

const getSubpages = async (authToken: string, pageIds: number[]) => {
  const promises = pageIds.map(pageId => {
    return getPage(authToken, pageId)
  })

  return Promise.all(promises).then(data => {
    return data.sort((a, b) => {
      const indexA = pageIds.indexOf(a.id)
      const indexB = pageIds.indexOf(b.id)
      return indexA - indexB
    })
  })
}