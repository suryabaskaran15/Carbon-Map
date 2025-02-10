import DataDisplay from "../components/DataDisplay/DataDisplay"
import Header from "../components/Header";
import Loader from "../components/Loader/Loader";
import MapComponent from "../components/MapComponent/MapComponent"
import useCarbonIntensity from "../hooks/useCarbonIntensity";
import ErrorPage from "./ErrorPage";

const HomePage = () => {
    const { heatmapData, loading, error, refetch } = useCarbonIntensity();

    const handleSync = () => {
        refetch(); // Refetch data from the API
    };

    if (loading) return <Loader />;
    if (error) return <ErrorPage />;
    return (
        <>
            <Header onSync={handleSync} /> {/* Add the Header component */}
            <MapComponent heatmapData={heatmapData} />
            <DataDisplay />
        </>
    )
}

export default HomePage;