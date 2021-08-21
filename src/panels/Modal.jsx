import React from "react";
import {
    ANDROID,
    CellButton,
    Group, IOS,
    ModalPage,
    ModalPageHeader, PanelHeaderButton, PanelHeaderClose,
    Placeholder,
    useAdaptivity,
    usePlatform,
    ViewWidth
} from "@vkontakte/vkui";
import {Icon24Dismiss} from "@vkontakte/icons";

const Modal = ({ updateModalHeight, onClose,room,list, ...props }) => {
    const { viewWidth } = useAdaptivity();
    const isMobile = viewWidth <= ViewWidth.MOBILE;
    const platform = usePlatform();
    const [expanded, setExpanded] = React.useState(false);
    const toggle = React.useCallback(() => setExpanded(!expanded), [expanded]);

    return (
        <ModalPage
            {...props}
            header={
                <ModalPageHeader
                    right={isMobile && platform === IOS && <PanelHeaderButton onClick={onClose}><Icon24Dismiss/></PanelHeaderButton>}
                    left={isMobile && platform === ANDROID && <PanelHeaderClose onClick={onClose}/>}
                >
                    Комната {room}
                </ModalPageHeader>
            }
        >
            <Group>
                {props.children}
            </Group>

        </ModalPage>
    );
};

export default Modal;