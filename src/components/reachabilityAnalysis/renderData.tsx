import React from "react";
import { ReachabilityAnalysisResponse } from "./reachability-types";
import { d } from "nextra/dist/types-BhjhW0gX";

interface fetchResults{
    loading: boolean
    error : boolean
    data? : ReachabilityAnalysisResponse
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
        console.log(data)
        return <div>Received data and rendering: {data.version} </div>
    }
    return <div> undefined behavior</div>
}

export default AnalysisResultsTable