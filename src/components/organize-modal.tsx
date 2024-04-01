import './styles/organize-modal.css'

export const OrganizeModal = () => {
  return (
    <>
      <div className="bg-stone-400">
        <div className="organize-header flex items-center flex-wrap">
          <img
            src="src/assets/organize_icon.svg"
            alt="Organize icon"
            className="organize-icon p-3"
          />
          <span className="ml-9 font-medium text-2xl text-white">Organiza</span>
        </div>
        <div className="flex justify-center">
          <a
            href="https://www.instagram.com/ceal_icin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="src/assets/icin_logo.png" alt="ICIN logo" />
          </a>
          <a
            href="https://www.instagram.com/ceal_ici_uta.iqq/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="src/assets/ici_logo.png" alt="ICI logo" />
          </a>
          <a
            href="https://www.instagram.com/exploratarapaca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="src/assets/explora_logo.png" alt="EXPLORA logo" />
          </a>
          <a
            href="https://www.instagram.com/ceal_ice_2023/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="src/assets/ice_logo.png" alt="ICE logo" />
          </a>
        </div>
      </div>
    </>
  );
};
