import { clx } from "@medusajs/ui"
import { getCategoriesList } from "@lib/data"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { Button } from "@medusajs/ui"
import { BarsThree } from "@medusajs/icons"

async function CategoriesDropdown() {
    const { product_categories } = await getCategoriesList(0, 20)

    return (
        <>
            <div className="group relative inline-block text-left">
                {/* Nút Menu */}
                <Button
                    variant="transparent"
                    className="rounded-full"
                    size="large"
                >
                    <BarsThree />
                    Danh Mục
                </Button>
                {/* Menu Dropdown */}
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-lg border border-gray-200 bg-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
                    {product_categories && (
                        <div className="flex flex-col">
                            <ul
                                className="grid grid-cols-1"
                                data-testid="footer-categories"
                            >
                                {product_categories?.slice(0, 6).map((c) => {
                                    if (c.parent_category) {
                                        return
                                    }

                                    const children =
                                        c.category_children?.map((child) => ({
                                            name: child.name,
                                            handle: child.handle,
                                            id: child.id,
                                        })) || null

                                    return (
                                        <li
                                            className="txt-small flex flex-col text-ui-fg-subtle"
                                            key={c.id}
                                        >
                                            <LocalizedClientLink
                                                className={clx(
                                                    "m-1 rounded-lg p-4 hover:bg-moba-green",
                                                    children && "txt-small-plus"
                                                )}
                                                href={`/categories/${c.handle}`}
                                                data-testid="category-link"
                                            >
                                                {c.name}
                                            </LocalizedClientLink>
                                            {children && (
                                                <ul className="grid grid-cols-1">
                                                    {children &&
                                                        children.map(
                                                            (child) => (
                                                                <li
                                                                    key={
                                                                        child.id
                                                                    }
                                                                >
                                                                    <LocalizedClientLink
                                                                        className="hover:text-ui-fg-base"
                                                                        href={`/categories/${child.handle}`}
                                                                        data-testid="category-link"
                                                                    >
                                                                        {
                                                                            child.name
                                                                        }
                                                                    </LocalizedClientLink>
                                                                </li>
                                                            )
                                                        )}
                                                </ul>
                                            )}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default CategoriesDropdown
