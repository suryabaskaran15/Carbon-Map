import DataDisplay from "../components/DataDisplay/DataDisplay"
import Loader from "../components/Loader/Loader";
import MapComponent from "../components/MapComponent/MapComponent"
import useCarbonIntensity from "../hooks/useCarbonIntensity";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
    const { heatmapData, loading, error } = useCarbonIntensity();

    if (loading) return <Loader />;
    if (error) return <ErrorPage/>;
    return (
        <>
            <MapComponent heatmapData={heatmapData} />
            <DataDisplay data={[]} />
        </>
    )
}

export default HomePage;