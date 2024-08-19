import { getCategoriesList } from "@lib/data"
import CategoriesButton from "../categories-button"

export default async function CategoriesDropdown() {
    const { product_categories } = await getCategoriesList(0, 6)

    const Category = product_categories.map((ca) => {
        return {
            name: ca.name,
            handle: ca.handle,
            id: ca.id
        }
    }) 

    const items = Category.map((c) => ({
        name: c.name,
        handle: c.handle,
        id: c.id
    }))

    return (
        <>
            <div className="text-left">
                <CategoriesButton items={items} />
            </div>
        </>
    )
}

