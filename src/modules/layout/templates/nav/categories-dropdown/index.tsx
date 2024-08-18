import { getCategoriesList } from "@lib/data"
import CategoriesButton from "../categories-button"

export default async function CategoriesDropdown() {
    const { product_categories } = await getCategoriesList(0, 6)

    const Category = product_categories.map((ca) => {
        return {
            name: ca.name,
            handle: ca.handle
        }
    }) 

    const items = Category.map((c) => ({
        name: c.name,
        handle: c.handle
    }))

    return (
        <>
            <div className="relative inline-block text-left group">
                {/* Nút Menu */}
                <CategoriesButton items={items} />
            </div>
        </>
    )
}

