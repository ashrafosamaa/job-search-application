import { customAlphabet } from 'nanoid'

const generateUniqueString = (length) => {
    const nanoid = customAlphabet('12345', length || 11)
    return nanoid()
}

export default generateUniqueString