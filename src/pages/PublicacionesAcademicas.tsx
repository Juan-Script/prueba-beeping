import CustomTable from '@/shared/components/CustomTable'
import CustomTopbar from '@/shared/components/CustomTopbar'
import { useData } from '@/shared/hooks/useData'
import { EndpointTypes } from '@/shared/utils/Types/EndpointTypeS'

export default function PublicacionesAcademicas() {
    const data = useData({
        endpoint: EndpointTypes.WORKS
    })

    return (
        <div
            className="w-full"
        >
            <CustomTopbar
                title='Publicaciones Académicas'
            />

            <CustomTable
                data={data}
            />
        </div>
    )
}
