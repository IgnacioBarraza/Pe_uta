import "./errormodal.css";

export default function ErrorModal({ show, close, error }) {

  return (
    <>
      {show ? (
        <div className="errorModalContainer" onClick={() => close()}>
          <div className="errorModal" onClick={(e) => e.stopPropagation()}>
            <main className="error_modal_content flex flex-col">
              <span className="text-lg font-bold mb-2">
                {error}
              </span>
            </main>
            <footer className="error_modal_footer flex justify-center">
                <button className="error_modal-close" onClick={() => close()}>Cerrar</button>
            </footer>
          </div>
        </div>
      ) : null}
    </>
  );
}
