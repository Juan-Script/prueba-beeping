import CustomTable from '@/shared/components/CustomTable'
import CustomTopbar from '@/shared/components/CustomTopbar'

export default function PublicacionesAcademicas() {
    return (
        <div
            className="w-full"
        >
            <CustomTopbar
                title='Publicaciones Académicas'
            />

            <CustomTable 
            />
        </div>
    )
}
