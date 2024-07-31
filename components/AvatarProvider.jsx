
import React, { createContext, useState, useContext } from 'react';

//create a global context 
export const AvatarContext = createContext();

export const AvatarProvider = ({ children }) => {
  const [avatar, setAvatar] = useState(null);
  const uploadAvatar = (new_img) =>{
    setAvatar(new_img)
  }

  return (
    <AvatarContext.Provider value={{ avatar, uploadAvatar }}>
      {children}
    </AvatarContext.Provider>
  );
};

//export a context to use
export const useAvater = ()=> useContext(AvatarContext)
