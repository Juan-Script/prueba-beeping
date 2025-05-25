import CustomTable from "@/shared/components/CustomTable";
import { useData } from "@/shared/hooks/useData";
import { EndpointTypes } from "@/shared/utils/Types/EndpointTypeS";
import PublicacionesColumns from "./Columns/PublicacionesColumns";

export default function PublicacionesTable() {
    const { data } = useData({
        endpoint: EndpointTypes.WORKS
    });

    return (
        <div>
            <CustomTable 
                data={data?.results || []}
                columns={PublicacionesColumns()}
            />
        </div>
    )
}
