import { LineWave } from  'react-loader-spinner'

const Loader = () => {
    return (
        <LineWave
            height="100"
            width="100"
            color="#000"
            ariaLabel="line-wave"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
        />
    )
}

export default Loader;