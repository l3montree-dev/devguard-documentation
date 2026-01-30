import React, { FormEventHandler, useState } from "react"
import { ReachabilityAnalysisResponse} from "./reachability-types"
import AnalysisResultsTable from "./renderData"

const apiBaseURL = 'http://localhost:8080/api/v1/'

export function ReachabilityAnalysisHero() {
    return (
        <div className="bg-[#0D1017] pt-24">
            <div className="mx-auto text-center max-w-4xl px-6 max-lg:text-center lg:max-w-7xl">
                <h1 className="text-balance text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-pretty">
                    Reachability Analysis 
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-400 max-lg:mx-auto sm:text-xl/8">
                    This page enables you to search for a npm package and get a list of all CVEs associated with it. 
                    Additionally you get information about whether the CVE is actually affecting this package or not. 
                </p>
            </div>
            <br/> <br/>
            <br/> 
        </div>
    )
}

export const apiCall = ( baseURL: string,params: string,init?: RequestInit) => {
   return fetch(baseURL + params,init)
}

export function ReachabilityAnalysisSearchBar() {
    const [input,setInput] = useState("")
    const [data, setData] = useState<ReachabilityAnalysisResponse>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const getData = async () => {
        setIsLoading(true)
        try{
            const response = await fetch(apiBaseURL+input)
            const data = await response.json()
            setIsLoading(false)

            if (!data || !response.ok) {
                window.alert("error when trying to fetch data from api endpoint")
            }
            setData(data)
        }catch{
            setError(true)
        }finally{
            setIsLoading(false)
        }
    }

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        getData()
    }
    

    return (
    <div className="block pt-20 pb-20 bg-[#0D1017]" >
        <form onSubmit={onSubmit}>
      <label htmlFor="name" className="ml-px block text-center pl-2 text-4xl font-semibold text-white content-center">
        Search Package
      </label>
      <div className="flex flex-row gap-4 mx-auto mt-4 w-1/2">
        <input
          id="name"
          name="package"
          type="text"
          placeholder="type away..."
          onChange={(e) => {setInput(e.target.value)}}
          className="text-center block w-1/3 mx-auto focus:w-full text-xl rounded-full bg-white/5 px-5 py-2 text-white outline outline-1 -outline-offset-1 outline-white/50 focus:outline-3 focus:outline-white/70 placeholder:text-gray-500 focus:placeholder:opacity-0 transition-all duration-300 ease-in-out"
        />
      </div>
      </form>
      <AnalysisResultsTable loading={isLoading} error={error} data={data} />
    </div>
    )
}                        
/* <input type="submit" className="block bg-primary p-2 rounded-md text-black font-semibold hover:bg-accent hover:text-accent-foreground" /> */