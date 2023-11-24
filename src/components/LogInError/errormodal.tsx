import "./errormodal.css";

export default function ErrorModal({ show, close, error }) {
  return (
    <>
      {show ? (
        <div
          className="errorModalContainer"
          onClick={() => close()}
          aria-label="Mensaje de Error"
          role="dialog"
        >
          <div
            className="errorModal"
            onClick={(e) => e.stopPropagation()}
            aria-describedby="error-message"
          >
            <main className="error_modal_content flex flex-col">
              <span className="text-lg font-bold mb-2" id="error-message">
                {error}
              </span>
            </main>
            <footer className="error_modal_footer flex justify-center">
              <button
                className="error_modal-close"
                onClick={() => close()}
                aria-label="Cerrar Modal"
              >
                Cerrar
              </button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
