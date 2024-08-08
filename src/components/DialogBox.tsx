// general purpose dialog box
// finish this later

import { Dialog } from "@rneui/base";
import React from "react";
interface DialogBoxProps {
    isVisible: boolean,
}
const DialogBox:React.FC<DialogBoxProps> = ({isVisible}) =>{
    return (
        <Dialog />
    )
}