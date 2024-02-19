

import { PageProps } from "$fresh/server.ts";
import { people } from "./types.tsx" 

const pageSearch = (props:PageProps<people>) => {
    
    return(
        <div>
            <form method="get" action="/people">
                <input type="text" name="name"/>
                <button type="submit">Filtrar</button>
            </form>
        </div>
    )
}    

export default pageSearch;