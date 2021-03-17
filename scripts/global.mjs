import { fileURLToPath } from 'url'
import { dirname } from 'path'
export default {}
global.__filename = fileURLToPath(import.meta.url)
global.__dirname = dirname(__filename)
