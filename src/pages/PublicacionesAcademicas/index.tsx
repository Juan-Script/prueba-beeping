import CustomTopbar from '@/shared/components/CustomTopbar'
import PublicacionesTable from './Table/PublicacionesTable'

export default function PublicacionesAcademicas() {

    return (
        <div
            className="w-full"
        >
            <CustomTopbar
                title='Publicaciones Académicas'
            />

            <PublicacionesTable
            />
        </div>
    )
}
