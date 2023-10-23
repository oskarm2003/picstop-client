import { useMemo, useState } from "react"
import { t_photo_data } from "../../types"
import * as VARS from '../vars.json'

//FUNCTION DESCRIPTION:

// random unique photo fetch
//steps:
//pick a value from 5 to 15 and assign it to jump_size
//after drawUnique function call fetch photos that (id - current_index) is divisible by jump_size
//if the ammount of fetched photos is not satisfying iterate current_index
//if current_index === jump_size set current_index to 0 
//repeat until full loop made


export default function useDrawUniquePhotos():
    [Array<t_photo_data> | 'error', boolean, boolean, (quantity: number) => void] {

    const [response, setResponse] = useState<Array<t_photo_data> | 'error'>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [all_fetched, setAllFetched] = useState(false)

    //private states
    const jump_size = useMemo(() => Math.floor(Math.random() * 10) + 5, [])
    const init_index = useMemo(() => Math.floor(Math.random() * (jump_size - 1) + 1), [])
    const [current_index, setCurrentIndex] = useState(init_index)

    const drawUnique = async (quantity: number) => {

        let _ci = current_index
        let result = new Array()

        while (true) {
            const url = `${VARS.API_URL}/photo/search/moduloid/${_ci}/${jump_size}/${quantity - result.length}`
            const response = await fetch(url, { method: 'GET' })

            if (!response.ok) {
                setLoading(false)
                setResponse('error')
                return
            }

            const data = await response.json()

            if (!Array.isArray(data)) {
                setLoading(false)
                setResponse('error')
                return
            }

            console.log(data);
            result = [...result, ...data]
            // console.log(result);


            if (result.length < quantity) {
                console.log('modulo ', _ci % jump_size);
                _ci = _ci % jump_size + 1
                if (_ci === init_index) {
                    setLoading(false)
                    setResponse(result)
                    setAllFetched(true)
                    return
                }
                if (_ci > jump_size) _ci = 1
            }
            else {
                _ci = result[result.length - 1].id + jump_size
                break
            }
        }

        setCurrentIndex(_ci)
        setLoading(false)
        setResponse(result)

    }

    return [response, loading, all_fetched, drawUnique]

}