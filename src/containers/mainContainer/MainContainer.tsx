import { useState, SyntheticEvent, useEffect, useCallback } from 'react';

import { SelectChangeEvent } from '@mui/material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import MainLayout from '../../layouts/MainLayout';
import SidebarContainer from "./MainSidebarContainer";
import ContentContainer from "./MainContentContainer";
import { Home, About, Skills, Portfolio, Achievements } from '../../pages/main';

import { Loading } from '../../components';
import { Page, UserSelectionWindow } from '../../components/main';
import { MainSidebar } from '../../components/sidebar';
import { MainDrawerActionButton } from "../../components/drawer/mainDrawer";

import { IUser } from '../../interfaces';
import { MainContext } from '../../services/contexts';
import { users as userApi } from '../../services/api/apiService';


const MainContainer = () => {
    const navigate = useNavigate();

    const [users, setUsers] = useState<IUser[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const [mode, setMode] = useState<"light" | "dark">("light");
    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [loadingPage, setLoadingPage] = useState<boolean>(true);
    const [openUserSelectionWindow, setOpenUserSelectionWindow] = useState<boolean>(true);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [currentUser, setCurrentUser] = useState<IUser>({
        fullName: "",
        aboutMe: "",
        avatar: "",
        isAdmin: false,
        isDelete: false,
        isShowResume: false,
        me: [],
        password: "",
        userName: ""
    });

    const handlePageNumber = (event: SyntheticEvent<Element, Event>, newPage: number) => {
        setPageNumber(newPage);
    }

    const userList = useCallback((): { userId: number, userFullName: string }[] => {
        let list: { userId: number, userFullName: string }[] = [];
        users.map(user => list.push({ userId: user.id || 0, userFullName: user.fullName }))
        return list;
    }, [users]);

    const handleChangeCurrentUser = (event: SelectChangeEvent) => {
        const userId: number = parseInt(event.target.value);
        if (userId !== currentUser.id) {
            const user = users.find(u => u.id === userId);
            if (user !== undefined) setCurrentUser(user);
        }
        setOpenUserSelectionWindow(false);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                setLoading(true);
                const { data, status } = await userApi.getUsers();
                if (data && status === 200) {
                    const filterUsers: IUser[] = data.filter(item => !item.isDelete && item.isShowResume);
                    if (filterUsers.length < 1) {
                        toast.info("هیچ کاربری وجود ندارد که بتوان رزومه آن را ببینید", { icon: "⛔" });
                        navigate("/notfound");
                        return
                    }
                    setUsers(filterUsers);
                    setCurrentUser(filterUsers[0]);
                }
                setLoading(false);

            } catch (error) {
                toast.error("خطایی در انجام عملیات رخ داد لطفا بعدا تلاش کنید", { icon: "⛔" });
                navigate("/notfound");
            }
        }
        fetchData();

        // eslint-disable-next-line
    }, []);

    return (
        <MainContext.Provider
            value={{
                mode,
                setMode,
                pageNumber,
                handlePageNumber,
                drawerOpen,
                setDrawerOpen,
                loadingPage,
                setLoadingPage,
                openUserSelectionWindow,
                setOpenUserSelectionWindow,
                currentUser,
                setCurrentUser,
                handleChangeCurrentUser,
                userList: userList(),
            }}>
            {loading ? <Loading /> : (
                <MainLayout>

                    <UserSelectionWindow />
                    <SidebarContainer>
                        <MainSidebar />
                    </SidebarContainer>
                    <MainDrawerActionButton />
                    <ContentContainer>
                        <Page pageNumber={pageNumber} index={0}>
                            <Home />
                        </Page>

                        <Page pageNumber={pageNumber} index={1}>
                            <About />
                        </Page>

                        <Page pageNumber={pageNumber} index={2}>
                            <Skills />
                        </Page>

                        <Page pageNumber={pageNumber} index={3}>
                            <Achievements />
                        </Page>

                        <Page pageNumber={pageNumber} index={4}>
                            <Portfolio />
                        </Page>

                    </ContentContainer>

                </MainLayout>
            )}
        </MainContext.Provider>
    );
};

export default MainContainer;