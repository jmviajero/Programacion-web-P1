import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { starship } from "./types.tsx"

type total = {
    id: string ,
    page: starship[]
}

export const handler:Handlers = {

    GET: async (req:Request, ctx: FreshContext<unknown, total>) => {
        try {
            const url = new URL (req.url);
            const pag = url.searchParams.get("pag") || undefined
            const page = await axios.get("https://swapi.dev/api/starships/?page=" + pag)

            if (page.status !== 200) {
                return ctx.render({id: "" , page: [] })
            }

            if (!pag) {
                return ctx.render({id: "" , page: [] })
            }

            const tot:total = {
                id: pag ,
                page: page.data.results
            }   

            return ctx.render(tot);

        } catch (error) {
            return ctx.render({id: "" , page: [] })            
        }
    }
}

const pagPage = (props:PageProps<total>) => {
    
    return (
        <div>
          
            <h1>Pag: {props.data.id}</h1>
            
            {props.data.page.map(starship => {
                return(
                    <div key={starship.name}>
                    <h3>{starship.name}</h3>
                    <ul>
                        <li>{starship.model}</li>
                        <li>{starship.manufacturer}</li>
                        <li>{starship.cost_in_credits}</li>
                    </ul>
                    </div>
            )
            })}
            {Number(props.data.id) < 4 && <a href={`/starship?pag=${parseInt(props.data.id) + 1}` }> Next </a>}
            {Number(props.data.id) > 1 && <a href={`/starship?pag=${parseInt(props.data.id) - 1}` }> Prev </a>}
            
            <form method="get" action="/starship">
                <input type="text" name="pag"/>
                <button type="submit">Buscar por pagina</button>
            </form>

        </div>
    )
}

export default pagPage