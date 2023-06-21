import { useState } from "react"
const useBoo = (initial) => {
    let [boo, setBoo] = useState(initial)
    const handleboo = (any) => {
        setBoo(any)
    }
    return [boo, handleboo];
}
export default useBoo;