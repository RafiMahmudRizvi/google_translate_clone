export default function SelectDropDown({ setShowModal, style, setLanguage}) {
    return(
        <div className="selct-drop-down" onClick={()=> setShowModal(style)}>
            <input value={setLanguage}/>
            <div className="down-arrow">
               <svg
                    focusable="false"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                  <path d="M7 10l5 5 5-5z"></path>
               </svg>
              
            </div>

        </div>
    )
}