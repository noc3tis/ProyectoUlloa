// Componente funcional puro para Feedback visual
const Spinner = () => {
    return (
        <div className='loadingSpinnerContainer'>
            {/* Animación CSS simple para indicar carga */}
            <div className='loadingSpinner' />
        </div>
    );
}

export default Spinner;