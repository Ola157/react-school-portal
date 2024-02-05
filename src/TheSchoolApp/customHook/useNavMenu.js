import { useState } from "react"

const useNavMenu = () => {
    let [category, setCategory] = useState()
    let [isMenu, setIsMenu] = useState(false)

    const handleCategory = (newCategory) => {
        setCategory((prev) => prev == newCategory ? null : newCategory)
    }

    const handleMenu = (menu) => {
        setIsMenu(menu)
    }

    return [category, handleCategory, isMenu, handleMenu]
}

export default useNavMenu