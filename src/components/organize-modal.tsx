import './styles/organize-modal.css'

export const OrganizeModal = () => {
  return (
    <>
      <div className="bg-davy-gray rounded-lg">
        <div className="flex items-center flex-wrap w-full bg-dark-gray rounded-t-lg p-2">
          <img
            src="/organize_icon.svg"
            alt="Organize icon"
            className="p-3"
          />
          <span className="ml-9 font-bold text-2xl text-white">Organiza</span>
        </div>
        <div className="flex justify-center p-3">
          <a
            href="https://www.instagram.com/ceal_icin/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/icin_logo.png" alt="ICIN logo" />
          </a>
          <a
            href="https://www.instagram.com/ceal_ici_uta.iqq/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ici_logo.png" alt="ICI logo" />
          </a>
          <a
            href="https://www.instagram.com/exploratarapaca/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/explora_logo.png" alt="EXPLORA logo" />
          </a>
          <a
            href="https://www.instagram.com/ceal_ice_2023/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src="/ice_logo.png" alt="ICE logo" />
          </a>
        </div>
      </div>
    </>
  );
};
