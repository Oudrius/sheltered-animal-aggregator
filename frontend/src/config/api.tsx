interface APIRoutes {
    Register: string,
    Login: string,
    Session: string,
    User: string,
    Animals: string
    Species: string,
    Csrf: string;
}

const ANIMALS_API_BASE_URL = process.env.REACT_APP_API_BASE_URL
const ANIMALS_API_AUTH_PATH = process.env.REACT_APP_API_AUTH_PATH
const ANIMALS_API_PATH = process.env.REACT_APP_API_PATH

const API_ROUTES: APIRoutes = {
    Register: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/register/`,
    Login: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/login/`,
    Session: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/session/`,
    Csrf: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/csrf/`,
    User: `${ANIMALS_API_BASE_URL}${ANIMALS_API_AUTH_PATH}/user/`,
    Animals: `${ANIMALS_API_BASE_URL}${ANIMALS_API_PATH}/animals/`,
    Species: `${ANIMALS_API_BASE_URL}${ANIMALS_API_PATH}/species/`,
}

export default API_ROUTES;