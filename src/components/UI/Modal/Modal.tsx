import React from 'react'
import cl from './Modal.module.css'

interface ModalProps {
    isVisible: boolean;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<ModalProps> = ({children, setIsVisible, isVisible}) => {
    const cls: string[] = [cl.modalBlock];
    if(isVisible) {
        cls.push(cl.active);
    }
  return (
    <div className={cls.join(' ')} 
        onClick={() => setIsVisible(false)}>
        <div className={cl.modalContent} 
            onClick={(ev: React.MouseEvent<HTMLDivElement>) => ev.stopPropagation()}>
            {children}
        </div>
    </div>
  )
}

export default Modal