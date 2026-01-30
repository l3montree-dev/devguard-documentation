import React from "react";
import { ReachabilityAnalysisResponse } from "./reachability-types";
import { d } from "nextra/dist/types-BhjhW0gX";

interface fetchResults{
    loading: boolean
    error : boolean
    data? : ReachabilityAnalysisResponse
}

interface tableEntry {
    component : string
    type : string
    count : string
}

const AnalysisResultsTable: React.FC<fetchResults> = ({loading,error,data}) => {
    if (loading && !error) {
        return <div>Loading</div>
    }
    if (!loading && error){
        return <div>Error occurred</div>
    }
    if (!data){
        return <div>No data in response</div>
    }

    if (!loading && !error && data){
        return (
            <div className="flex flex-row justify-center items-center mt-20">
                <table className="divide-y text-center rounded-lg w-1/2">
                    <thead className="text-3xl bg-gray-800/75 divide-gray-200">
                    <tr>
                        <th className="py-3 px-10 font-semibold">Component</th>
                        <th className="py-3 px-10 font-semibold">Type</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y text-xl bg-gray-800/50">
                    {data.components.map((component, index) => (
                        <tr key={index}>
                            <td className="py-3 px-5">{component.purl}</td>
                            <td className="py-3 px-5">{component.type}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        )
    }
    return <div>undefined behavior</div>
}

export default AnalysisResultsTable