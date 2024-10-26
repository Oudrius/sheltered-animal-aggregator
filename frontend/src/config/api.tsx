interface APIRoutes {
    Register: string,
    Login: string,
}

const ANIMALS_API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const ANIMALS_API_AUTH_PATH = process.env.REACT_APP_API_AUTH_PATH
const ANIMALS_API_PATH = process.env.REACT_APP_API_PATH

const API_ROUTES: APIRoutes = {
    Register: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/register/`,
    Login: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/login/`
}

export default API_ROUTES;