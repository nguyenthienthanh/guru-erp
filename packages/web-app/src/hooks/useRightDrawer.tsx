import { useContext, useState } from 'react'

// tslint:disable-next-line:import-name
import createContainer from 'constate'

const useRightDrawerHook = () => {
  const [open, setOpen] = useState(!false)
  return [open, setOpen] as [boolean, typeof setOpen]
}

export const UseRightDrawerContainer = createContainer(useRightDrawerHook)

const useRightDrawer = () => useContext(UseRightDrawerContainer.Context)

export default useRightDrawer
