import { SelectChangeEvent } from "@mui/material";
import { createContext, Dispatch, SetStateAction, SyntheticEvent } from "react";
import { ILocalStorage, IUser } from "../../interfaces";

interface IAdminContext {
    drawerOpen: boolean,
    setDrawerOpen: Dispatch<SetStateAction<boolean>>,
    loading: boolean,
    setLoading: Dispatch<SetStateAction<boolean>>,
    isCompletedForms: boolean,
    setIsCompletedForms: Dispatch<SetStateAction<boolean>>,
    userLocalStorage: ILocalStorage | undefined,
    setUserLocalStorage: Dispatch<SetStateAction<ILocalStorage | undefined>>,
}

export const AdminContext = createContext<IAdminContext>({
    drawerOpen: false,
    setDrawerOpen: () => { },
    loading: false,
    setLoading: () => { },
    isCompletedForms: false,
    setIsCompletedForms: () => { },
    userLocalStorage: undefined,
    setUserLocalStorage: () => { },

});

interface IMainContext {
    mode: "light" | "dark",
    setMode: Dispatch<SetStateAction<"light" | "dark">>,
    pageNumber: number,
    handlePageNumber: (event: SyntheticEvent<Element, Event>, newPage: number) => void,
    drawerOpen: boolean,
    setDrawerOpen: Dispatch<SetStateAction<boolean>>,
    loadingPage: boolean,
    setLoadingPage: Dispatch<SetStateAction<boolean>>,
    openUserSelectionWindow: boolean,
    setOpenUserSelectionWindow: Dispatch<SetStateAction<boolean>>,
    currentUser: IUser,
    setCurrentUser: Dispatch<SetStateAction<IUser>>,
    handleChangeCurrentUser: (event: SelectChangeEvent) => void,
    userList: { userId: number, userFullName: string }[],
}

export const MainContext = createContext<IMainContext>({
    mode: "light",
    setMode: () => { },
    pageNumber: 0,
    handlePageNumber: () => { },
    drawerOpen: false,
    setDrawerOpen: () => { },
    loadingPage: true,
    setLoadingPage: () => { },
    openUserSelectionWindow: true,
    setOpenUserSelectionWindow: () => { },
    currentUser: {
        fullName: "",
        aboutMe: "",
        avatar: "",
        isAdmin: false,
        isDelete: false,
        isShowResume: false,
        me: [],
        password: "",
        userName: ""
    },
    setCurrentUser: () => { },
    handleChangeCurrentUser: () => { },
    userList: [],
})