import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "npm:axios";
import { people } from "./types.tsx"


export const handler:Handlers = {

    GET: async (req:Request, ctx: FreshContext<unknown, people>) => {
        try {
            const url = new URL (req.url);
            const name = url.searchParams.get("name") ||undefined
            const character = await axios.get("https://swapi.dev/api/people?search=" + name)

            if (character.status !== 200) {
                throw new Error("No ha funcionado");
            }

            return ctx.render({
                name: character.data.results[0]?.name,
                height: character.data.results[0]?.height,
                mass: character.data.results[0]?.mass,
                gender: character.data.results[0]?.gender,
                birth_year: character.data.results[0]?.birth_year
            })
        } catch (error) {
            throw new Error("No funciona");
            
        }
    }
}

const pagPeople = (props:PageProps<people>) => {
    
    return (
        <div>
            <h1>{props.data.name}</h1>
            <ol>
                <li>height: {props.data.height} </li>
                <li>mass: {props.data.mass} </li>
                <li>gender: {props.data.gender} </li>
                <li>birth year: {props.data.birth_year} </li>
            </ol>
        </div>
    )
}

export default pagPeople
