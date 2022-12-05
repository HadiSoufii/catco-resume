import {
    HomeRounded, FaceRounded, TextSnippetRounded, TerminalRounded, MessageRounded,
} from '@mui/icons-material';

const tabProps = (index: number) => {
    return {
        id: `sidebar-tab-${index}`,
        "aria-controls": `tabpanel-${index}`
    }
};

export const tabsData = () => {
    const tabs = [
        { label: "صفحه اصلی", icon: HomeRounded, ...tabProps(0), },
        { label: "درباره من", icon: FaceRounded, ...tabProps(1), },
        { label: "مهارت های من", icon: TextSnippetRounded, ...tabProps(2), },
        { label: "دستاوردها", icon: TerminalRounded, ...tabProps(3), },
        { label: "نمونه کارها", icon: MessageRounded, ...tabProps(4), },
    ];
    return tabs;
};